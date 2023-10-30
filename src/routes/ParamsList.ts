import ROUTES from 'routes/RouteNames'
import {
  BulkFileTransfer,
  ExternalTransferData,
  InternalTransferInitiateData,
  Transaction,
} from 'types/api/transaction'
import { ChangePasswordData } from 'types/api/user'
import { MappedAccount } from 'types/mapped/account'
import { ROUTE_REFERENCE } from 'utils/enum'
import {
  CHARGE_BEARER,
  CLIENT_SIDE_TRANSACTION_TYPES,
  TRANSACTION_STATUSES,
} from 'utils/transactions'

type TransactionData = {
  type: CLIENT_SIDE_TRANSACTION_TYPES
  transfer: InternalTransferInitiateData
  totalAmount: number
  reference: string
  status: TRANSACTION_STATUSES
  transactionDate: string
  beneficiaryName?: string
  files?: Array<string>
}

type InitTransactionData = {
  from?: MappedAccount
  to?: MappedAccount
  amount?: number
  paymentDetails?: string
}

type ClearTransactionData = {
  resetData?: boolean
}

export type LogInStackParamList = {
  [ROUTES.Login]: undefined
  [ROUTES.ForgottenPass]: undefined
  [ROUTES.OneTimePassword]: {
    reference:
      | ROUTE_REFERENCE.CHANGE_PASSWORD
      | ROUTE_REFERENCE.CHANGE_PHONE
      | ROUTE_REFERENCE.LOG_IN
    passwordData: Omit<ChangePasswordData, 'otp'>
    phoneNumber: string
    loginData: { username: string; password: string }
  }
  [ROUTES.Notifications]: undefined
  [ROUTES.EmailSend]: { email: string } | undefined
  [ROUTES.ResetPassword]: undefined
  [ROUTES.SuccessPassword]: { reference?: any; isPhone?: boolean; isForgotPassword?: boolean }
  [ROUTES.EnterPin]: undefined
}

export type DashboardStackParamList = {
  [ROUTES.Home]: { refreshBalance: boolean } | undefined
  [ROUTES.Account]:
    | {
        [key: string]: string | number
        accountNumber: string
        balance: number
        client: string
        currency: string
        id: number
        title: string
      }
    | undefined
  [ROUTES.EditField]: { [key: string]: any; value: any; label: any; reference: any }
  [ROUTES.Settings]: undefined
  [ROUTES.PersonalInfo]: { details: any | undefined }
  [ROUTES.Password]: { username?: string }
  [ROUTES.ContactUs]: { category?: string; message?: string }
  [ROUTES.AccountDetails]: { from: any } | undefined
  [ROUTES.AccountStatement]: undefined
  [ROUTES.FeeStatement]: undefined
  [ROUTES.ClientStatement]: undefined
  [ROUTES.MessageSent]: { email?: string }
  [ROUTES.DocumentPreview]: { fileName: string; file: string }
}

export type MoneyTransferStackParamList = {
  [ROUTES.ToOwnAccount]: (InitTransactionData & ClearTransactionData) | undefined
  [ROUTES.EnterAmount]: {
    to: MappedAccount & {
      bankBic: string
      bankName: string
      bankAddress: string
      address: string
      beneficiaryCountryCode: string
      chargeBearer: CHARGE_BEARER
      isUrgent: boolean
    }
    from: MappedAccount
    type: CLIENT_SIDE_TRANSACTION_TYPES
    amount?: number
    paymentDetails?: string
  }
  [ROUTES.ConfirmTransfer]: {
    type: CLIENT_SIDE_TRANSACTION_TYPES
    from: MappedAccount
    to: MappedAccount
    transactionDetails: {
      amountReceived: number
      amountSent: number
      transactionFee: number
      rate?: number | undefined
    }
    paymentDetails: string
    transfer?: ExternalTransferData
    files?: Array<string>
  }
  [ROUTES.OneTimePassword]: {
    reference: ROUTE_REFERENCE.CONFIRM
    transactionData: Omit<TransactionData, 'reference' | 'transactionDate'>
  }
  [ROUTES.ToAnotherBank]: { to: any; from: any } | undefined
  [ROUTES.CreatePayment]: ({ to?: any; from?: any } & ClearTransactionData) | undefined
  [ROUTES.SuccessTransaction]: TransactionData
  [ROUTES.AddTransactionToFavorites]: {
    accountNumber: string
    reference: string
    transactionDate: string
    currency: string
    amount?: number
    paymentDetails?: string
  }
  [ROUTES.ToMoneyGateFirstStep]: { from?: MappedAccount } | undefined
  [ROUTES.ToMoneyGateSecondStep]:
    | (Omit<InitTransactionData, 'to'> & { to?: string } & ClearTransactionData)
    | undefined
  [ROUTES.FavouritesTransactions]: undefined
  [ROUTES.TransactionDetails]: {
    accountNumber: string
    transactionReference: string
    type: CLIENT_SIDE_TRANSACTION_TYPES
    isFee: boolean
    feeData?: Transaction & { paymentDetails: string }
  }
  [ROUTES.Filter]: { currency?: string }
  [ROUTES.Exchange]: (InitTransactionData & ClearTransactionData) | undefined
  [ROUTES.CurrencyRates]: { currency: any } | undefined
  [ROUTES.RatesHistory]: { item: any }
  [ROUTES.BulkFileUpload]: { from?: MappedAccount } | undefined
  [ROUTES.BulkFilePayment]: { transfer: BulkFileTransfer; from: MappedAccount }
  [ROUTES.ContactUs]: { message: string }
}
