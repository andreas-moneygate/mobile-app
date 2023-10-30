import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  Column,
  CurrencyCourseCard,
  CurrentCurrencyBar,
  LineChart,
  SmallBackground,
  TabsView,
} from 'components'
import useChartDots from 'hooks/useChartDots'
import { memo, useCallback, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { renderLineDomain } from 'utils/charts'

function RatesHistory() {
  const { goBack } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.RatesHistory>>()
  const { item } = params
  const insets = useSafeAreaInsets()
  const dots = useChartDots()

  const [selectedPeriod, setSelectedPeriod] = useState('1w')
  const [fromCurrency, setFromACurrency] = useState(item?.currency)
  const defToCurrency = useMemo(() => (fromCurrency === 'USD' ? 'EUR' : 'USD'), [fromCurrency])
  const [toCurrency, setToCurrency] = useState(defToCurrency)

  const selectedData: any[string] = useMemo(
    () => dots.find((item: any) => item[selectedPeriod]),
    [dots, selectedPeriod],
  )

  const domain = renderLineDomain(selectedData[selectedPeriod])

  const infoCurrency = {
    currency: fromCurrency,
    rate: item?.rate,
    isIncrease: true,
    date: '25 Aug, 16:45',
    percentagePart: '0,08',
    rateOfChange: '0,001432',
  }

  const onSelected = useCallback(period => {
    setSelectedPeriod(period)
  }, [])

  const onExchange = useCallback(() => {
    setFromACurrency(toCurrency)
    setToCurrency(fromCurrency)
  }, [toCurrency, fromCurrency])

  return (
    <Wrapper pb={insets.bottom}>
      <SmallBackground>
        <AccountHeader title="Rates History" onBack={goBack} />
      </SmallBackground>
      <Column mv="xxl" mh="l">
        <CurrentCurrencyBar fromCurr={fromCurrency} toCurr={toCurrency} onExchange={onExchange} />
        <CurrencyCourseCard {...infoCurrency} period={selectedPeriod} />
      </Column>
      <LineChart data={selectedData[selectedPeriod]} domain={domain} />
      <Column mh="l" mt="l">
        <TabsView
          tabs={['1d', '1w', '1m', '3m', '6m', '1y']}
          activeTab={selectedPeriod}
          onSelectTab={onSelected}
        />
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  flex: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

export default memo(RatesHistory)
