import { QueryFunctionContext, QueryKey } from 'react-query'
import { PaginatedData } from 'types/api/common'
import { CurrencyEntry, CurrencyRates, ExchangeRate } from 'types/api/currency'
import callApi from 'utils/callApi'

export const getCurrencies = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<PaginatedData<Array<CurrencyEntry>>> => {
  const [, query] = queryKey

  return callApi(`/Currencies`, { method: 'GET', query: query || { PageNumber: 0, PageSize: 100 } })
}

export const getCurrencyRate = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<PaginatedData<Array<CurrencyRates>>> => {
  const [, currencyCode, query] = queryKey
  const newQuery = {
    currencyCode,
    ...(query || { PageNumber: 0, PageSize: 100 }),
  }

  return callApi(`/Currencies/rates`, { method: 'GET', query: newQuery || undefined })
}

export const getCurrencyExchange = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<ExchangeRate> | null => {
  const [, fromCurrency, toCurrency, amount] = queryKey

  if (!fromCurrency || !toCurrency) {
    return null
  }

  const query = {
    SourceCurrencyCode: fromCurrency,
    DestinationCurrencyCode: toCurrency,
    Amount: amount || 1,
  }

  return callApi(`/Currencies/exchange-amount`, {
    method: 'GET',
    query,
  })
}
