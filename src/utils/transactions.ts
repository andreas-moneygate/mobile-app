import icons from 'assets/icons'
import ROUTES from 'routes/RouteNames'
import { FavoriteTransactionDetails, TransactionDetails } from 'types/api/transaction'

import { getAccount } from './apiQueries/account'
import {
  execBulkTransfer,
  execExternalTransfer,
  executeInternalTransfer,
  initBulkTransfer,
  initExternalTransfer,
  initiateInternalTransfer,
} from './apiQueries/transaction'
import { mapAccountsData } from './mappers'

export enum TRANSACTION_TYPES {
  OTHER = 0,
  INTERNAL = 10,
  INTERNAL_FX = 11,
  EXTERNAL = 20,
  BULK = 21,
  CARD = 30,
  FEE = 44,
  OTHER_FEE = 45,
}

export enum TRANSACTION_STATUSES {
  REJECTED = 0,
  PENDING = 1,
  REQUIRES_APPROVAL = 2,
  EXECUTED = 3,
}

export enum TRANSACTION_SEARCH_TYPES {
  INTERNAL = 0, // TRANSACTION_TYPES.INTERNAL and TRANSACTION_TYPES.INTERNAL_FX
  EXTERNAL = 1, // TRANSACTION_TYPES.EXTERNAL
  BULK = 2, // TRANSACTION_TYPES.BULK
  CARD = 3, // TRANSACTION_TYPES.CARD
  FEE = 4, // TRANSACTION_TYPES.FEE and TRANSACTION_TYPES.OTHER_FEE
}

export enum CLIENT_SIDE_TRANSACTION_TYPES {
  EXCHANGE = 'exchange',
  OWN_ACCOUNT_PAYMENT = 'ownAccountPayment',
  MNGT_PAYMENT = 'mngtPayment',
  BANK_PAYMENT = 'bankPayment',
  CARD_PAYMENT = 'cardPayment',
  FEE_PAYMENT = 'feePayment',
  BULK_PAYMENT = 'bulkPayment',
  OTHER = 'other',
}

export const matchClientAndSearchTypes = {
  [CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT]: TRANSACTION_SEARCH_TYPES.INTERNAL,
  [CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT]: TRANSACTION_SEARCH_TYPES.INTERNAL,
  [CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT]: TRANSACTION_SEARCH_TYPES.EXTERNAL,
  [CLIENT_SIDE_TRANSACTION_TYPES.CARD_PAYMENT]: TRANSACTION_SEARCH_TYPES.CARD,
  [CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT]: TRANSACTION_SEARCH_TYPES.BULK,
  [CLIENT_SIDE_TRANSACTION_TYPES.FEE_PAYMENT]: TRANSACTION_SEARCH_TYPES.FEE,
  [CLIENT_SIDE_TRANSACTION_TYPES.OTHER]: undefined,
  [CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE]: TRANSACTION_SEARCH_TYPES.INTERNAL,
} as const

export const REPEAT_TRANSACTION_ROUTES = {
  [CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE as const]: ROUTES.Exchange,
  [CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT as const]: ROUTES.ToOwnAccount,
  [CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT as const]: ROUTES.ToMoneyGateSecondStep,
  [CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT as const]: ROUTES.CreatePayment,
  [CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT as const]: ROUTES.CreatePayment,
}

export const TRANSACTION_ICONS = {
  [CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE as const]: icons.exchange,
  [CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT]: icons.upload,
  [`${CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT}_DEBIT` as const]: icons.upload,
  [`${CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT}_CREDIT` as const]: icons.download,
  [CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT as const]: undefined, // takes customer name letters
  [CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT as const]: icons.bank,
  [CLIENT_SIDE_TRANSACTION_TYPES.CARD_PAYMENT as const]: icons.card,
  [CLIENT_SIDE_TRANSACTION_TYPES.FEE_PAYMENT as const]: icons.fee,
  [CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT as const]: icons.bulkFile,
  [CLIENT_SIDE_TRANSACTION_TYPES.OTHER as const]: icons.bank,
}

export enum CHARGE_BEARER {
  OUR,
  BENEFICIARY,
  SHARED,
}

export enum BANK_TRANSFER_OPTION {
  STANDARD,
  URGENT,
}

export const initTransferHandlers = {
  [CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE as const]: initiateInternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT as const]: initiateInternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT as const]: initiateInternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT as const]: initExternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT as const]: initBulkTransfer,
}

export const execTransferHandlers = {
  [CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE as const]: executeInternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT as const]: executeInternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT as const]: executeInternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT as const]: execExternalTransfer,
  [CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT as const]: execBulkTransfer,
}

export const getRouteForRepeatTransaction = (
  transactionType: TRANSACTION_TYPES,
  userHasAccessToCounterPartyAccount = false,
) => {
  if (
    transactionType === TRANSACTION_TYPES.INTERNAL ||
    transactionType === TRANSACTION_TYPES.INTERNAL_FX
  ) {
    if (userHasAccessToCounterPartyAccount) {
      return REPEAT_TRANSACTION_ROUTES.ownAccountPayment
    } else {
      return REPEAT_TRANSACTION_ROUTES.mngtPayment
    }
  }
  return REPEAT_TRANSACTION_ROUTES.bankPayment
}

export const getDataForRepeatTransaction = async (
  transaction: TransactionDetails | FavoriteTransactionDetails,
) => {
  const isMngtPayment =
    (transaction.transactionType === TRANSACTION_TYPES.INTERNAL ||
      transaction.transactionType === TRANSACTION_TYPES.INTERNAL_FX) &&
    !transaction.userHasAccessToCounterPartyAccount
  const isBank = transaction.transactionType === TRANSACTION_TYPES.EXTERNAL
  const isBulk = transaction.transactionType === TRANSACTION_TYPES.BULK

  const [from, to] = await Promise.all([
    getAccount(transaction.accountNumber),
    !isMngtPayment && !isBulk && !isBank
      ? getAccount(transaction.counterPartyAccountNumber)
      : transaction.counterPartyAccountNumber,
  ])

  const fromAccount = mapAccountsData(
    from,
    0,
    transaction.counterPartyName || transaction.counterPartyAccountName,
  )

  let toAccount = to
  if (!isMngtPayment && !isBank && !isBulk) {
    toAccount = mapAccountsData(to, 0, transaction.counterPartyName)
  }
  if (isBank || isBulk) {
    toAccount = {
      ...to,
      beneficiaryName: transaction.counterPartyName || transaction.counterPartyAccountName,
      beneficiaryAddress: transaction.counterPartyAddress,
      iban: transaction.counterPartyAccountNumber,
      swiftCode: transaction.counterPartyBankBic || transaction.counterPartytBic,
      amount: Math.abs(transaction.amount || transaction.accountAmount),
      paymentDetails: transaction.paymentDetails,
    }
  }

  return {
    from: fromAccount,
    to: toAccount,
    amount: Math.abs(transaction.amount || transaction.accountAmount),
    paymentDetails: transaction.paymentDetails,
  }
}
