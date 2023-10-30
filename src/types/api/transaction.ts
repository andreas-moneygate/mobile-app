import { TRANSACTION_TYPES } from 'utils/transactions'

import { PaginatedData } from './common'

export interface Transaction {
  accountAmount: number
  accountCurrency: string
  accountNumber: string
  balanceAfterTransaction: number
  description: string
  isFee: boolean
  fees: number
  operationCodeDescription: string
  referenceNumber: string
  status: number
  transactionDate: string
  transactionType: number
  valueDate: string
  counterPartyAccountName: string
  counterPartyAccountNumber: string
}

export type Transactions = PaginatedData<Array<Transaction>>

export interface TransactionDetails extends Transaction {
  canBeAddedToFavorites: boolean
  counterPartytBic: string
  exchangeRate: number
  paymentDetails: string
  transactionAmount: number
  transactionCurrency: string
  userHasAccessToCounterPartyAccount: boolean
}

export interface TransactionFee {
  feeType: string
  description: string
  currencyCode: string
  amount: number
}

export interface FavoriteTransaction {
  accountNumber: string
  amount?: number
  favoriteName: string
  id: string
  paymentDetails?: string
  referenceNumber: string
  transactionDate: string
}

export interface FavoriteTransactionDetails extends FavoriteTransaction {
  type: string
  transactionType: TRANSACTION_TYPES
  currencyCode: string
  counterPartyName: string
  counterPartyAccountNumber: string
  counterPartyAddress?: string
  counterPartyBankBic?: string
  counterPartyBankName?: string
  counterPartyBankAddress?: string
  userHasAccessToCounterPartyAccount?: boolean
}

export interface InternalTransferInitiateData {
  fromAccountNumber: string
  beneficiaryAccountNumber: string
  currencyCode: string
  executionDate?: string
  amount: number
  paymentDetails: string
  requestIdentifier: string
}

export interface ExternalTransferData {
  fromAccountNumber: string
  beneficiaryAccountNumber: string
  currencyCode: string
  executionDate: string
  amount: number
  paymentDetails: string
  requestIdentifier: string
  chargeBearer: number
  beneficiaryBankBic: string
  beneficiaryBankName: string
  beneficiaryBankAddress: string
  beneficiaryCountryCode: string
  beneficiaryName: string
  beneficiaryAddress: string
  isUrgent: boolean
}

export interface TransferInitResponse {
  requiresSca: boolean
}

type ExecuteTransferData<T> = {
  otp?: string
  documents?: Array<string>
  transfer: T
  pendingTransferId?: string
}

export type InternalTransferExecuteData = ExecuteTransferData<InternalTransferInitiateData>

export type ExternalTransferExecuteData = ExecuteTransferData<ExternalTransferData>

export interface TransferResponse {
  message: string
  reference: string
  debitAmount: number
  creditAmount: number
  totalDebitAmount: number
  totalCreditAmount: number
  debitValueDate: string
  creditValueDate: string
  exchangeRate: number
  transactionDate: string
  rejectionReason: string
  status: number
  documentErrorMsg: string
  nextExecutionDate: string
  lastExecutionDate: string
  debitAmountCurrency: string
  creditAmountCurrency: string
}

export interface BulkFileUploadData {
  fromAccountNumber: string
  currencyCode: string
  executionDate: string
  requestIdentifier: string
  bulkTransferFile: string
}

export interface BulkFileTransfer {
  fromAccountNumber: string
  currencyCode: string
  executionDate: string
  requestIdentifier: string
  bulkTransfersDetails: Array<{
    beneficiaryAccountNumber: string
    beneficiaryName: string
    beneficiaryAddress: string
    beneficiaryBankBic: string
    amount: number
    paymentDetails: string
    fee: number
    errors?: {
      [key: string]: Array<string>
    }
  }>
  requireSca: boolean
  totalAmount: number
}

export type BulkFileTransferExecData = ExecuteTransferData<BulkFileTransfer>

export interface ValidAccount {
  accountNumber: string
  currency: string
  clientId: string
  clientName: string
}

export interface ValidBankData {
  bic: string
  bankName: string
  addressLines: Array<string>
  city: string
  countryCode: string
  countryName: string
}
