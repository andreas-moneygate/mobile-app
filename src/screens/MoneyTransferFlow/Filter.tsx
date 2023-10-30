import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import images from 'assets/images'
import {
  AmountRangeInput,
  AmountSlider,
  Background,
  BodySmall,
  Button,
  Column,
  Container,
  FilterSection,
  Header,
  KeyboardAvoidingView,
  Row,
  ScrollView,
  TabsView,
} from 'components'
import { DatePicker } from 'components/picker/DatePicker'
import { ItemPicker } from 'components/picker/ItemPicker'
import useFilters from 'hooks/useFilters'
import useTransactions from 'hooks/useTransactions'
import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { TransactionFilters } from 'types/filters'
import { currencySymbols } from 'utils/currencies'
import { formatDate } from 'utils/date'
import { I18N_NAMESPACES } from 'utils/i18n'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'
import { numbersWithDot, numberWithSpaces } from 'utils/ui'

function Filter() {
  const { goBack } =
    useNavigation<NavigationProp<MoneyTransferStackParamList & DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.Filter>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const filters = useFilters()
  const { transactionFilters, changeTransactionFilters } = useTransactions()

  const currency = params?.currency ? currencySymbols[params?.currency] : currencySymbols.EUR

  const [selectedRule, setSelectedRule] = useState<TransactionFilters['rule']>(
    transactionFilters.rule,
  )
  const [selectedType, setSelectedType] = useState(transactionFilters.type)

  const [selectedDate, setSelectedDate] = useState(transactionFilters.date)
  const [selectedAmount, setSelectedAmount] = useState(transactionFilters.amount)

  const ruleValues: Array<TransactionFilters['rule']> = useMemo(
    () => ['All', 'Incoming', 'Outgoing'],
    [],
  )

  const initDate = useMemo(
    () => ({
      start: selectedDate.fromDate,
      end: selectedDate.toDate,
    }),
    [selectedDate],
  )

  const handleSelectRule = useCallback((value: string) => {
    setSelectedRule(value as TransactionFilters['rule'])
  }, [])

  const handleSelectType = useCallback((value: string | number | undefined) => {
    setSelectedType(value as CLIENT_SIDE_TRANSACTION_TYPES)
  }, [])

  const handleSelectDate = useCallback((fromDate: string, toDate: string) => {
    setSelectedDate({ fromDate, toDate })
  }, [])

  const submitFilters = useCallback(() => {
    changeTransactionFilters({
      rule: selectedRule,
      date: selectedDate,
      type: selectedType,
      amount: {
        min: Number(selectedAmount?.min) || 0,
        max: Number(selectedAmount?.max) || 500000,
      },
    })

    goBack()
  }, [changeTransactionFilters, selectedRule, selectedDate, selectedType, selectedAmount, goBack])

  const resetFilters = useCallback(() => {
    changeTransactionFilters({ reset: true })
    goBack()
  }, [])

  const handleChangeAmountMin = useCallback(
    (value: string) => {
      const withoutCurrency = value.slice(currency.length)
      const min = numbersWithDot(withoutCurrency.slice(withoutCurrency[0] === '0')) || 0

      setSelectedAmount({ min: min[0] === '.' ? '0' + min : min, max: selectedAmount?.max })
    },
    [selectedAmount?.max, currency],
  )

  const handleChangeAmountMax = useCallback(
    (value: string) => {
      const withoutCurrency = value.slice(currency.length)
      const max = numbersWithDot(withoutCurrency.slice(withoutCurrency[0] === '0')) || 0

      setSelectedAmount({ min: selectedAmount?.min, max: max[0] === '.' ? '0' + max : max })
    },
    [selectedAmount?.min, currency],
  )

  return (
    <Background image={images.background}>
      <Container safeBottom type="transparent">
        <Header leftIcon="clear" onLeftPress={resetFilters} rightIcon="close" onRightPress={goBack}>
          <BodySmall color="white">{t('FILTER')}</BodySmall>
        </Header>
        <Wrapper>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Column mt="l">
              <TabsView
                tabs={ruleValues}
                activeTab={selectedRule}
                onSelectTab={handleSelectRule}
                filter
              />

              <ItemPicker
                title={t(`${I18N_NAMESPACES.COMMON}::TYPE`)}
                data={filters[0].data}
                value={selectedType}
                onSelect={handleSelectType}
                CustomPickerButton={FilterSection}
              />

              <DatePicker
                title={t(`${I18N_NAMESPACES.COMMON}::PERIOD`) as string}
                value={`${formatDate(selectedDate.fromDate)} - ${formatDate(selectedDate.toDate)}`}
                initValue={initDate}
                onSelect={handleSelectDate}
                CustomPickerButton={FilterSection}
              />

              <BodySmall color="lightMagentaPink" mt="l">
                {t('AMOUNT_RANGE')}
              </BodySmall>
              <Row mv="m" justifyContent="center">
                <AmountRangeInput
                  label="From"
                  value={currency + numberWithSpaces(selectedAmount?.min?.toString() || '0')}
                  onChangeText={handleChangeAmountMin}
                  mr="s"
                  width="48%"
                />
                <AmountRangeInput
                  label="To"
                  onChangeText={handleChangeAmountMax}
                  value={currency + numberWithSpaces(selectedAmount?.max?.toString() || '500 000')}
                  width="48%"
                />
              </Row>
              <AmountSlider value={selectedAmount} onSelect={setSelectedAmount} />
            </Column>
          </ScrollView>
          <Column>
            <Button onPress={submitFilters} title={t('FILTER_BUTTON')} mv="l" />
          </Column>
        </Wrapper>
      </Container>
    </Background>
  )
}

const Wrapper = styled(KeyboardAvoidingView).attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
}))`
  padding: 0 20px 20px 20px;
`

export default memo(Filter)
