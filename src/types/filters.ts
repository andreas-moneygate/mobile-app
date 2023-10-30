import { Dispatch, SetStateAction } from 'react'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

export interface Filters {
  transactions: {
    filters: TransactionFilters
    setFilters: Dispatch<SetStateAction<TransactionFilters>>
  }
}

export interface TransactionFilters {
  rule: 'All' | 'Incoming' | 'Outgoing'
  date: {
    fromDate: string
    toDate: string
  }
  type?: CLIENT_SIDE_TRANSACTION_TYPES
  amount?: {
    min: number
    max: number
  }
  paymentDetails?: string
  isDefault: boolean
}
