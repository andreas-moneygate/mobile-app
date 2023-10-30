import { GlobalSpinner } from 'components'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { memo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from 'react-query'
import Navigator from 'routes/Navigator'
import { UserContext } from 'state/contexts'
import { AppProvider } from 'state/providers'
import styled, { ThemeProvider } from 'styled-components/native'
import { lightTheme } from 'theme'
import i18n, { changeLanguage, getLanguage } from 'utils/i18n'

import configureQueryClient from './src/state'

const App = memo(() => {
  const { authorize } = useContext(UserContext)

  const queryClient = useMemo(() => configureQueryClient({ authorize }), [authorize])

  const setLanguage = useCallback(async () => {
    const language = await getLanguage()
    await changeLanguage(language)
  }, [])

  useEffect(() => {
    setLanguage()
  }, [setLanguage])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <AppProvider>
          <I18nextProvider i18n={i18n}>
            <NavWrapper>
              <Navigator />
            </NavWrapper>
          </I18nextProvider>
          <GlobalSpinner />
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
})

const NavWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`

export default App
