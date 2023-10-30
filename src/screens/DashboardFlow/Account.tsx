import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import images from 'assets/images'
import {
  AccountActions,
  AccountAnalyticsItem,
  AnimationOpacityWrapper,
  Background,
  BalanceBar,
  ClientPicker,
  Column,
  CustomList,
  Header,
  HeaderScrollView,
  InstrumentsBar,
  PaymentDetailsInput,
  Row,
  SnapCarousel,
  TabsView,
  TransactionsList,
} from 'components'
import { DatePicker } from 'components/picker/DatePicker'
import useClients from 'hooks/useClients'
import useErrorHandler from 'hooks/useErrorModal'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import moment from 'moment'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header'
import { useQuery } from 'react-query'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { MappedAccount } from 'types/mapped/account'
import { MappedClient } from 'types/mapped/client'
import { MappedTransaction } from 'types/mapped/transactions'
import { getAccountAnalytics } from 'utils/apiQueries/account'
import { calcPercentage } from 'utils/charts'
import { currencySymbols } from 'utils/currencies'
import { submitFormatDate } from 'utils/date'
import { I18N_NAMESPACES } from 'utils/i18n'
import {
  HEADER_HEIGHT,
  PARALLAX_HEIGHT_DETAILS,
  SNAP_START_THRESHOLD,
  SNAP_STOP_THRESHOLD_ACCOUNT_DETAILS,
} from 'utils/parallax'
import { screenHeight, screenWidth } from 'utils/ui'

const ANALYTICS_DIAGRAM_HEIGHT = 385

function Account() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.Account>>()
  const insets = useSafeAreaInsets()
  const { selectedClient, setSelectedClient, isLoaded } = useClients()
  const [isSelectedTab, setSelectedTab] = useState('Transactions')
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const { showGlobalSpinner, hideGlobalSpinner } = useGlobalSpinner()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) {
      hideErrorModal()
    }
  }, [isFocused])

  useEffect(() => {
    if (isLoaded) {
      hideGlobalSpinner()
    }
  }, [isLoaded])

  const accountMappedData = selectedClient?.accounts

  const defaultIndexAccount = useMemo(
    () => accountMappedData.findIndex(account => account.accountNumber === params?.accountNumber),
    [accountMappedData, params],
  )
  const [selectedIndexAccount, setSelectedIndexAccount] = useState(defaultIndexAccount)
  const [selectedIndexAnalytics, setSelectedIndexAnalytics] = useState(0)
  const [selectedAnalyticsPeriod, setSelectedAnalyticsPeriod] = useState({
    start: monthAgo,
    end: now,
  })

  const handleSelectDate = useCallback((start: string, end: string) => {
    setSelectedAnalyticsPeriod({ start, end })
  }, [])
  const onSelectClient = useCallback(
    (client: MappedClient) => {
      if (client.id !== selectedClient?.id) {
        setSelectedClient(client)
        goTo(ROUTES.Home)();
      }
      hideErrorModal()
    },
    [selectedClient?.id],
  )

  const onSnapAccount = useCallback(i => {
    setSelectedIndexAccount(i)
    hideErrorModal()
  }, [])
  const onSnapAnalytics = useCallback(i => setSelectedIndexAnalytics(i), [])

  const goTo = useCallback(
    (route: ROUTES, params?: any) => () => navigate(route, params),
    [navigate],
  )

  const selectedIndex = useMemo(
    () => accountMappedData.findIndex((_: any, index: number) => index === selectedIndexAccount),
    [accountMappedData, selectedIndexAccount],
  )
  const selectedAccount = useMemo<MappedAccount>(
    () => accountMappedData?.[selectedIndex] || accountMappedData[0],
    [accountMappedData, selectedIndex],
  )

  const { data: accountAnalytics = {} } = useQuery(
    ['accountAnalytics', selectedAccount?.accountNumber, selectedAnalyticsPeriod],
    getAccountAnalytics,
  )

  const graphicData = useMemo(() => {
    const { debitAmount, creditAmount } = accountAnalytics
    const [debitY, creditY] = calcPercentage(debitAmount, creditAmount)

    return [
      { y: debitY, name: 'income', fill: '#773358' },
      { y: creditY, name: 'outcome', fill: '#F5F5F5' },
    ]
  }, [accountAnalytics])

  const dataAnalytics = useMemo(() => {
    const { debitAmount, creditAmount } = accountAnalytics
    const [debitPercentage, creditPercentage] = calcPercentage(debitAmount, creditAmount)

    return [
      {
        category: t(`${I18N_NAMESPACES.COMMON}::INCOME`),
        balance: debitAmount || 0,
        currencySymbol: currencySymbols[selectedAccount?.currency],
        percent: debitPercentage,
      },
      {
        category: t(`${I18N_NAMESPACES.COMMON}::OUTGOING`),
        balance: creditAmount || 0,
        currencySymbol: currencySymbols[selectedAccount?.currency],
        percent: creditPercentage,
      },
    ]
  }, [accountAnalytics, selectedAccount?.currency, t])

  const onProceed = useCallback(
    route => {
      delete selectedAccount.fields
      navigate(route, { from: { ...selectedAccount } })
    },
    [navigate, selectedAccount],
  )

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

  const LIST_HEIGHT = screenHeight - insets.top - HEADER_HEIGHT
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT_DETAILS,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD_ACCOUNT_DETAILS,
    snapToEdge: true,
  })

  const isAnalytics = isSelectedTab !== t('TRANSACTIONS')

  const analyticsDateRange = useMemo(
    () =>
      `${submitFormatDate(selectedAnalyticsPeriod.start)} - ${submitFormatDate(
        selectedAnalyticsPeriod.end,
      )}`,
    [selectedAnalyticsPeriod.end, selectedAnalyticsPeriod.start],
  )

  return (
    <Background image={images.background}>
      <Header
        leftIcon="back"
        rightIcon="notification"
        error={error}
        hideErrorModal={hideErrorModal}
        onLeftPress={goBack}
        onRightPress={goTo(ROUTES.NotificationsList)}
      >
        <Column width="100%" alignItems="center">
          <AnimationOpacityWrapper
            scrollValue={scrollValue}
            outputRange={[0, 1]}
            inputRange={[0, 250]}
          >
            <BalanceBar
              balance={selectedAccount?.balance}
              currencySymbol={currencySymbols[selectedAccount?.currency]}
              currency={selectedAccount?.currency}
              inHeader
            />
          </AnimationOpacityWrapper>
          <AnimationOpacityWrapper
            scrollValue={scrollValue}
            outputRange={[0, 1]}
            inputRange={[100, 0]}
            isHeader
          >
            <ClientPicker client={selectedClient?.title} onSelect={onSelectClient} />
          </AnimationOpacityWrapper>
        </Column>
      </Header>
      <HeaderScrollView
        innerRef={scrollViewRef}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        bounces={false}
        stickyTabs
        stickyHeaderIndices={stickyIndicator}
        renderHeader={() => (
          <AccountActions
            scrollHeight={scrollHeight}
            scrollValue={scrollValue}
            selectedIndexAccount={selectedIndexAccount}
            accountMappedData={accountMappedData}
            selectedAccountBalance={selectedAccount?.balance}
            onProceed={onProceed}
            onSnapAccount={onSnapAccount}
            showErrorModal={showErrorModal}
          />
        )}
        renderTabs={() => (
          <CustomList ph="l">
            <TabsView
              tabs={[t('TRANSACTIONS'), t('ANALYTICS')]}
              activeTab={isSelectedTab}
              onSelectTab={setSelectedTab}
            />
          </CustomList>
        )}
      >
        {!isAnalytics ? (
          <Column bg="white" ph="l" pt="m">
            <InstrumentsBar
              leftIcon="filter"
              rightIcon="search"
              onRightPress={goTo(ROUTES.SearchTransaction)}
              onLeftPress={goTo(ROUTES.Filter, {
                currency: selectedAccount?.currency,
              })}
            />
          </Column>
        ) : (
          <Column minHeight={LIST_HEIGHT} ph="l" pb="l" bg="white">
            <Row justifyContent="flex-end" pt="m">
              <DatePicker initValue={selectedAnalyticsPeriod} onSelect={handleSelectDate} />
            </Row>
            <Row justifyContent="center" height={ANALYTICS_DIAGRAM_HEIGHT}>
              <SnapCarousel
                index={selectedIndexAnalytics}
                data={dataAnalytics}
                renderItem={({ item }: any) => (
                  <AccountAnalyticsItem
                    item={item}
                    graphicData={graphicData}
                    index={selectedIndexAnalytics}
                  />
                )}
                onSnap={onSnapAnalytics}
                itemWidth={screenWidth}
                slideStyle={analyticsSlideStyle}
                dotStyle={analyticsDotStyle}
              />
            </Row>
            <Column mh={-20}>
              <PaymentDetailsInput value={analyticsDateRange} editable={false} textAlign="center" />
            </Column>
          </Column>
        )}

        {!isAnalytics ? (
          <Column minHeight={LIST_HEIGHT} ph="l" pb="l" bg="white">
            <TransactionsList
              selectedAccountNumber={selectedAccount?.accountNumber}
              onSelected={onSelectedTransaction}
            />
          </Column>
        ) : null}
      </HeaderScrollView>
    </Background>
  )
}

const analyticsSlideStyle = { paddingRight: 20 }

const analyticsDotStyle = { backgroundColor: '#773358' }

const now = moment().format('YYYY-MM-DD')
const monthAgo = moment().add(-1, 'month').format('YYYY-MM-DD')

const stickyIndicator = [0]

export default memo(Account)
