import AsyncStorage from '@react-native-async-storage/async-storage'
import images from 'assets/images'
import * as LocalAuthentication from 'expo-local-authentication'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppState, AppStateStatus, ImageBackground, View } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { UserContext } from 'state/contexts'
import { Tokens } from 'types/api/user'
import { getUserInfo, logout, refreshToken } from 'utils/apiQueries/user'

type Props = {
  children: React.ReactNode
}

const UserProvider = ({ children }: Props) => {
  const [tokens, setTokens] = useState<Tokens | null>(null)
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingBio, setIsCheckingBio] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean | undefined>()
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState)
  const backgroundTime = useRef(new Date().getTime())
  const isAuthNotFinished = useRef(true)
  const refreshInterval = useRef<number>()

  const updateToken = useCallback((tokens: Tokens) => {
    setTokens(tokens)
  }, [])

  const {
    data: userData,
    refetch,
    remove,
    isLoading: isUserLoading,
  } = useQuery('user', getUserInfo, { enabled: false })

  const removeTokens = useCallback(async () => {
    setIsLoading(false)

    const accessToken = await AsyncStorage.getItem('@accessToken')
    if (accessToken) {
      await logout()
    }

    AsyncStorage.removeItem('@refreshToken')
    AsyncStorage.removeItem('@accessToken')

    setTokens(null)
    remove()
    queryClient.removeQueries()
  }, [remove, queryClient])

  const { mutate: refresh } = useMutation(refreshToken, {
    onSuccess: tokens => {
      updateToken(tokens)
      setIsRefreshing(undefined)
    },
    onError: () => {
      setIsRefreshing(false)
      removeTokens()
    },
  })

  const authorize = useCallback(async () => {
    const useBiometric = (await AsyncStorage.getItem('@useBiometric')) === 'true'

    const refreshToken = await AsyncStorage.getItem('@refreshToken')

    if (!useBiometric) {
      if (refreshToken) {
        removeTokens()
      }

      return setIsLoading(false)
    }

    if (refreshToken) {
      setIsCheckingBio(true)
      const authenticateAsync = await LocalAuthentication.authenticateAsync({
        cancelLabel: 'Use login',
        fallbackLabel: '',
        disableDeviceFallback: true,
        requireConfirmation: false,
      })
      setIsCheckingBio(false)

      if (authenticateAsync.success) {
        setIsRefreshing(true)
        refresh(refreshToken)
      } else {
        removeTokens()
      }
    } else {
      setIsLoading(false)
    }
  }, [refresh, removeTokens])

  useEffect(() => {
    if (isAuthNotFinished.current) {
      isAuthNotFinished.current = false

      authorize()
    }
  }, [authorize])

  useEffect(() => {
    if (tokens?.access_token) {
      AsyncStorage.setItem('@refreshToken', tokens.refresh_token)
      AsyncStorage.setItem('@accessToken', tokens.access_token)

      refetch()
      setIsLoading(false)
    }
  }, [tokens, refetch])

  const timeoutRefresh = useCallback(() => {
    if (userData) {
      refreshInterval.current = +setTimeout(async () => {
        const refreshToken = await AsyncStorage.getItem('@refreshToken')

        if (refreshToken) {
          refresh(refreshToken)
        }

        timeoutRefresh()
      }, 9 * 60 * 1000)
    } else {
      refreshInterval.current = +setTimeout(() => {
        timeoutRefresh()
      }, 9 * 60 * 1000)
    }
  }, [userData, refresh])

  useEffect(() => {
    timeoutRefresh()

    return () => {
      clearTimeout(refreshInterval.current)
    }
  }, [timeoutRefresh])

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active' && userData) {
        const now = new Date().getTime()
        const backgroundDuration = now - backgroundTime.current

        if (backgroundDuration > 60000) {
          setIsCheckingBio(true)

          const authenticateAsync = await LocalAuthentication.authenticateAsync({
            cancelLabel: 'Use login',
            fallbackLabel: '',
            disableDeviceFallback: true,
            requireConfirmation: false,
          })

          setIsCheckingBio(false)

          if (!authenticateAsync.success) {
            removeTokens()
          }
        }
      }

      if (nextAppState.match(/inactive|background/)) {
        backgroundTime.current = new Date().getTime()
      }

      setAppState(nextAppState)
    },
    [appState, userData, authorize],
  )

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      appStateSubscription.remove()
    }
  }, [handleAppStateChange])

  const contextUser = useMemo(
    () => ({
      user: tokens ? userData : null,
      isLoading: isLoading || isUserLoading,
      isRefreshing,
      logout: removeTokens,
      authorize,
      updateToken,
    }),
    [
      tokens,
      userData,
      isLoading,
      isUserLoading,
      isRefreshing,
      removeTokens,
      authorize,
      updateToken,
    ],
  )

  return (
    <UserContext.Provider value={contextUser}>
      {children}
      {appState.match(/inactive|background/) || isCheckingBio ? (
        <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 999 }}>
          <ImageBackground source={images.splash} style={{ width: '100%', height: '100%' }} />
        </View>
      ) : null}
    </UserContext.Provider>
  )
}

export default UserProvider
