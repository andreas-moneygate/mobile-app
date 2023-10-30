export interface ExchangeRate {
  destinationCurrencyCode: string
  sourceCurrencyCode: string
  convertedAmount: number
  exchangeRate: number
  strongCurrencyExchangeRate: number
}

export interface CurrencyEntry {
  currencyCode: string
  decimals: number
  description: string
}

export interface CurrencyRates {
  askRate: number
  bidRate: number
  currencyCode: string
  referenceCurrencyCode: string
}
