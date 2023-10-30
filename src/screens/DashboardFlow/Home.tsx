import { BottomSheetModal } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import images from 'assets/images'
import {
  AccountsBar,
  AnimationOpacityWrapper,
  Background,
  BalanceBar,
  Body,
  Button,
  ClientPicker,
  Column,
  Container,
  CustomBottomModalSheet,
  CustomList,
  DonutChart,
  Header,
  HeaderScrollView,
  InstrumentsBar,
  TabsView,
  TransactionsList,
} from 'components'
import useClients from 'hooks/useClients'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import useNotifications from 'hooks/useNotifications'
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header'
import { useQuery } from 'react-query'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { MappedClient } from 'types/mapped/client'
import { MappedTransaction } from 'types/mapped/transactions'
import { getClientConvertedBalance } from 'utils/apiQueries/client'
import { getDonutColor } from 'utils/charts'
import { checkBiometricSupport, toggleUseBiometric } from 'utils/common'
import { currencyEnum, currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'
import {
  HEADER_HEIGHT,
  parallaxHeightHomeScreen,
  SNAP_START_THRESHOLD,
  SNAP_STOP_THRESHOLD_ACCOUNT_CONTAINER,
} from 'utils/parallax'
import { screenHeight } from 'utils/ui'

function Home() {
  const { navigate, setParams } =
    useNavigation<NavigationProp<DashboardStackParamList & MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.Home>>()
  const insets = useSafeAreaInsets()
  const goTo = useCallback((route, params) => () => navigate(route, params), [navigate])
  const [isSelectedTab, setSelectedTab] = useState('Transactions')
  const [visibleAllAccounts, setVisibleAllAccounts] = useState(false)
  const [approximateCurrency, setApproximateCurrency] = useState<string>(currencyEnum.EUR)
  const { selectedClient, setSelectedClient, isLoaded: isClientsLoaded } = useClients()
  const { isThereUnreadNotification } = useNotifications()
  const { hideGlobalSpinner, showGlobalSpinner } = useGlobalSpinner()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['1%', 270], [])

  const {
    data: clientBalance,
    isFetchedAfterMount: isBalanceLoaded,
    refetch,
  } = useQuery(
    ['clientBalance', selectedClient.id, approximateCurrency],
    getClientConvertedBalance,
    {
      enabled: Boolean(selectedClient.id),
    },
  )

  useEffect(() => {
    if (params?.refreshBalance) {
      refetch()
      setParams(undefined)
    }
  }, [params?.refreshBalance])

  useEffect(() => {
    if (isClientsLoaded && isBalanceLoaded) {
      hideGlobalSpinner()
    }
  }, [isClientsLoaded, isBalanceLoaded, hideGlobalSpinner])

  const graphicData = useMemo(
    () =>
      selectedClient?.analytics?.map((analytics, index, { length }) => ({
        y: analytics.percentageOfTotal,
        name: analytics.currency,
        fill: getDonutColor(index, length),
      })),
    [selectedClient.analytics],
  )

  const dataAnalytics = useMemo(
    () => ({
      category: t('APPROXIMATE_BALANCE'),
      balance: clientBalance?.availableBalance,
      currencySymbol: currencySymbols[clientBalance?.currencyCode || 'USD'],
      percent: 100,
    }),
    [clientBalance, t],
  )

  const onSelectClient = useCallback(
    (client: MappedClient) => {
      if (client.id !== selectedClient?.id) {
        showGlobalSpinner({ type: 'withLogo' })
        setSelectedClient(client)
      }
    },
    [selectedClient?.id],
  )

  const handleSheetModalChanges = useCallback((i: number) => {
    if (i === 0) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const handleShowBiometricModal = useCallback(async () => {
    const useBiometric = await AsyncStorage.getItem('@useBiometric')
    const isBiometricSupported = await checkBiometricSupport()
    if (useBiometric === null && isBiometricSupported) {
      bottomSheetModalRef.current?.present()
    }
  }, [])

  const handleHideBiometricModal = useCallback(async () => {
    await AsyncStorage.setItem('@useBiometric', 'false')
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const handleToggleBiometric = useCallback(async () => {
    await toggleUseBiometric()
    bottomSheetModalRef.current?.dismiss()
  }, [])

  useEffect(() => {
    handleShowBiometricModal()
  }, [])

  const PARALLAX_HEIGHT = parallaxHeightHomeScreen(selectedClient.accounts, visibleAllAccounts)
  const LIST_HEIGHT = screenHeight - insets.top - HEADER_HEIGHT
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD_ACCOUNT_CONTAINER,
    snapToEdge: true,
  })

  const onSelectedTransaction = useCallback(
    (params: MappedTransaction) => {
      navigate(ROUTES.TransactionDetails, {
        accountNumber: params.transfer.accountNumber,
        transactionReference: params.transfer.reference,
        type: params.transfer.type,
        isFee: params.transfer.isFee,
        feeData: params.transfer.feeData,
      })
    },
    [navigate],
  )

  const isAnalytics = isSelectedTab === t('ANALYTICS')

  return (
    <HomeWrapper>
      <Background image={images.homeBG}>
        <Header
          leftIcon="settings"
          rightIcon={isThereUnreadNotification ? 'notificationUnread' : 'notification'}
          onLeftPress={goTo(ROUTES.Settings)}
          onRightPress={goTo(ROUTES.NotificationsList)}
        >
          <Column width="100%" alignItems="center">
            <AnimationOpacityWrapper
              scrollValue={scrollValue}
              outputRange={[0, 1]}
              inputRange={[0, 330]}
            >
              <BalanceBar {...dataAnalytics} inHeader />
            </AnimationOpacityWrapper>
            <AnimationOpacityWrapper
              scrollValue={scrollValue}
              outputRange={[0, 1]}
              inputRange={[100, 0]}
              isHeader
            >
              <ClientPicker client={selectedClient.title} onSelect={onSelectClient} />
            </AnimationOpacityWrapper>
          </Column>
        </Header>
        <HeaderScrollView
          innerRef={scrollViewRef}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          bounces={false}
          stickyHeaderIndices={[0]}
          renderHeader={() => (
            <AccountsBar
              balance={clientBalance?.availableBalance}
              approximateCurrency={approximateCurrency}
              visibleAllAccounts={visibleAllAccounts}
              scrollValue={scrollValue}
              scrollHeight={scrollHeight}
              setApproximateCurrency={setApproximateCurrency}
              setVisibleAllAccounts={setVisibleAllAccounts}
            />
          )}
        >
          <CustomList ph="l">
            <Column>
              <TabsView
                tabs={[t('TRANSACTIONS'), t('ANALYTICS')]}
                activeTab={isSelectedTab}
                onSelectTab={setSelectedTab}
                mb={isAnalytics ? 's' : 'l'}
              />
              {!isAnalytics ? (
                <InstrumentsBar
                  leftIcon="filter"
                  rightIcon="search"
                  onRightPress={goTo(ROUTES.SearchTransaction)}
                  onLeftPress={goTo(ROUTES.Filter, {
                    currency: selectedClient?.accounts?.[0]?.currency,
                  })}
                />
              ) : null}
            </Column>
          </CustomList>
          <Column
            minHeight={isAnalytics ? LIST_HEIGHT - 100 : LIST_HEIGHT}
            ph="l"
            pb="l"
            pt="s"
            bg="white"
          >
            {isAnalytics ? (
              <DonutChart
                data={graphicData}
                radius={140}
                alignItems="center"
                dataAnalytics={dataAnalytics}
                summaryList
                mt={40}
              />
            ) : (
              <TransactionsList onSelected={onSelectedTransaction} />
            )}
          </Column>
        </HeaderScrollView>
        <CustomBottomModalSheet
          innerRef={bottomSheetModalRef}
          onChange={handleSheetModalChanges}
          snapPoints={snapPoints}
        >
          <Column justifyContent="space-between" m="l">
            <Body fontWeight="600" textAlign="center" mv="l" mh="xxl">
              Do you want to use biometric for logging in?
            </Body>
            <Button title="Use biometric" onPress={handleToggleBiometric} mb="m" />
            <Button title="Cancel" type="light" onPress={handleHideBiometricModal} />
          </Column>
        </CustomBottomModalSheet>
      </Background>
    </HomeWrapper>
  )
}

const HomeWrapper: any = Platform.select({
  ios: Fragment,
  android: Container,
})

export default memo(Home)
