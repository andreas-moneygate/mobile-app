import { TransactionDetails } from 'types/api/transaction'
import { SvgComponent } from 'types/ui'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

export interface MappedTransaction {
  transfer: {
    reference: string
    accountNumber: string
    currency: string
    icon: SvgComponent | undefined
    type: CLIENT_SIDE_TRANSACTION_TYPES
    typeLabel: string
    beneficiaryLabel: string
    beneficiaryName: string
    grosAmount: number
    isFee: boolean
    feeData?: Partial<TransactionDetails>
  }
}

export type MappedTransactions = Array<{
  title: string
  data: Array<MappedTransaction>
}>
