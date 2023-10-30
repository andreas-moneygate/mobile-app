import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { MappedCurrency } from 'types/mapped/currency'
import { getCurrencies, getCurrencyRate } from 'utils/apiQueries/currency'
import { CURR_TO_FIXED, currencyEnum } from 'utils/currencies'

const useCurrencyRates = (baseCurrency?: string) => {
  const { data: currencyEntries } = useQuery(['currencies'], getCurrencies)
  const { data: currencyRates } = useQuery(
    ['currencyRates', baseCurrency || currencyEnum.EUR],
    getCurrencyRate,
  )

  const currencies = useMemo<Array<MappedCurrency>>(
    () =>
      currencyRates?.data.map((rate, id) => {
        const entry = currencyEntries?.data.find(
          currency => currency?.currencyCode === rate.currencyCode,
        )

        return {
          currency: rate.currencyCode,
          title: entry?.description || '',
          rate: rate.askRate.toFixed(CURR_TO_FIXED).toString(),
          id: id + 1,
        }
      }) || [],
    [currencyEntries, currencyRates],
  )

  return currencies
}

export default useCurrencyRates
