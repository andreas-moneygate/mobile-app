import moment from 'moment'
import { TransactionFilters } from 'types/filters'

export const DEFAULT_FILTER_DATE = {
  fromDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
  toDate: moment().add(3, 'day').format('YYYY-MM-DD'),
}

export const isDefaultTransactionFilters = (filters: TransactionFilters) =>
  filters.rule === 'All' &&
  filters.date.fromDate === DEFAULT_FILTER_DATE.fromDate &&
  filters.date.toDate === DEFAULT_FILTER_DATE.toDate &&
  !filters.type &&
  !filters.amount?.min &&
  !filters.amount?.max

export const formatAmountForSlider = (amount: number) => {
  if (amount > 10000) {
    return (amount / 1000).toFixed(0) + 'k'
  }
  if (amount === 0.01) {
    return amount
  }
  return amount.toFixed()
}
