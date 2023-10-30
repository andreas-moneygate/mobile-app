import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  Caption,
  Column,
  CurrencyCard,
  CurrencyRatesPicker,
  Row,
  SmallBackground,
} from 'components'
import useCurrencyRates from 'hooks/useCurrencyRates'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedCurrency } from 'types/mapped/currency'
import { I18N_NAMESPACES } from 'utils/i18n'

function CurrencyRates() {
  const { goBack, navigate, setParams } =
    useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.CurrencyRates>>()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const currencyRates = useCurrencyRates(params?.currency)

  const [selectedCurrency, setSelectedCurrency] = useState<MappedCurrency | undefined>()

  useEffect(() => {
    const prevSelectedCurrency = currencyRates?.find(
      currRate => currRate.currency === params?.currency,
    )
    if (prevSelectedCurrency) {
      setSelectedCurrency(prevSelectedCurrency)
    } else if (currencyRates.length) {
      const [initCurrency] = currencyRates
      setSelectedCurrency(initCurrency)
    }
  }, [currencyRates, params?.currency])

  const currencyRatesToShow = useMemo(
    () => currencyRates?.filter(it => it.currency !== selectedCurrency?.currency) || {},
    [currencyRates, selectedCurrency],
  )

  const onSelect = useCallback(item => {
    setSelectedCurrency({ ...item, rate: '1.0000' })
    setParams({ currency: item.currency })
  }, [])

  const renderHeader = useMemo(() => {
    return (
      <Column mt="xl">
        <CurrencyRatesPicker
          label={t(`${I18N_NAMESPACES.TRANSFER_FLOW}::BASE_CURRENCY`) as string}
          data={currencyRates}
          initialCurrency={selectedCurrency}
          onSelect={onSelect}
        />
        <CurrencyHeader>
          <Caption flex={2} color="darkGray">
            {t('CURRENCY')}
          </Caption>
          <Caption flex={1} color="darkGray">
            {t('RATE')}
          </Caption>
        </CurrencyHeader>
      </Column>
    )
  }, [t, currencyRates, selectedCurrency, onSelect])

  const renderItem = useCallback(
    ({ item }: { item: any }) => <CurrencyCard item={item} hideArrow />,
    [],
  )

  return (
    <Wrapper pb={insets.bottom}>
      <SmallBackground>
        <AccountHeader
          title={t(`${I18N_NAMESPACES.TRANSFER_FLOW}::CURRENCY_RATES`)}
          onBack={goBack}
        />
      </SmallBackground>
      <FlatList
        data={currencyRatesToShow}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item: any) => item?.id}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  flex: 1px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`

const CurrencyHeader = styled(Row)`
  padding-right: ${({ theme }) => theme.spacings.xl}px;
  padding-left: ${({ theme }) => theme.spacings.l}px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.mintCream};
  border-color: ${({ theme }) => theme.colors.gray95};
  border-top-width: 1px;
  border-bottom-width: 1px;
  height: 40px;
  width: 100%;
`

export default memo(CurrencyRates)
