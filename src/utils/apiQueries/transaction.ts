import { QueryFunctionContext, QueryKey } from 'react-query'
import { PaginatedData } from 'types/api/common'
import {
  BulkFileTransfer,
  BulkFileTransferExecData,
  BulkFileUploadData,
  ExternalTransferData,
  ExternalTransferExecuteData,
  FavoriteTransaction,
  FavoriteTransactionDetails,
  InternalTransferExecuteData,
  InternalTransferInitiateData,
  TransactionDetails,
  TransactionFee,
  Transactions,
  TransferInitResponse,
  TransferResponse,
  ValidAccount,
  ValidBankData,
} from 'types/api/transaction'
import callApi from 'utils/callApi'

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

export const getTransactions = ({
  queryKey,
  pageParam = 0,
}: QueryFunctionContext<QueryKey>): Promise<Transactions> | null => {
  const [, filters] = queryKey
  return callApi('/Transactions/search', {
    method: 'POST',
    query: {
      PageNumber: pageParam,
      PageSize: 50,
    },
    body: filters,
  })
}

export const getTransactionDetails = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<TransactionDetails | undefined> => {
  const [, accountNumber, referenceNumber] = queryKey as [never, string, string]

  if (accountNumber?.length !== 11) {
    return Promise.resolve(undefined)
  }

  return callApi(`/Accounts/${accountNumber}/Transactions/${referenceNumber}`, {
    method: 'GET',
  })
}

export const getTransactionReceipt = (
  accountNumber: string,
  transactionReference: string,
): Promise<string> => {
  return callApi(`/Accounts/${accountNumber}/Transactions/${transactionReference}/receipt`, {
    method: 'GET',
    query: { languageCode: 'en' },
    isText: true,
  })
}

export const getBulkTransactionReceipt = (referenceNumber: string): Promise<string> => {
  return callApi(`/Transactions/Transfers/bulk/${referenceNumber}/receipt`, {
    method: 'GET',
    isText: true,
  })
}

const stringTypeToEnum = {
  ExternalTransfer: TRANSACTION_TYPES.EXTERNAL,
  InternalTransferFx: TRANSACTION_TYPES.INTERNAL_FX,
  InternalTransfer: TRANSACTION_TYPES.INTERNAL,
}

export const getFavoriteTransactions = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<PaginatedData<Array<FavoriteTransaction>>> => {
  const [,] = queryKey
  const favorites = await callApi('/Transactions/favorites', {
    method: 'GET',
  })

  const favoritesWithCorrectType = favorites?.data?.map(favTransaction => ({
    ...favTransaction,
    transactionType: stringTypeToEnum[favTransaction.type] || TRANSACTION_TYPES.OTHER,
  }))

  return { ...favorites, data: favoritesWithCorrectType }
}

export const getFavoriteTransaction = async (id: string): Promise<FavoriteTransactionDetails> => {
  const favorite = await callApi(`/Transactions/favorites/${id}`, {
    method: 'GET',
  })
  const favoriteWithCorrectType = {
    ...favorite,
    transactionType: stringTypeToEnum[favorite.type] || TRANSACTION_TYPES.OTHER,
  }

  return favoriteWithCorrectType
}

export const getFavoriteTransactionByReference = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const [, transactionReference] = queryKey

  try {
    const data = await callApi(`/Transactions/favorites/byreference/${transactionReference}`, {
      method: 'GET',
    })
    return data
  } catch (err) {
    if (err.status === 404) {
      return false
    }
    throw err
  }
}

export const addTransactionToFavorites = (
  transaction: Omit<FavoriteTransaction, 'id'>,
): Promise<{ id: number }> => {
  return callApi('/Transactions/favorites', {
    method: 'POST',
    body: { ...transaction },
  })
}

export const deleteTransactionFromFavorites = (id: string): Promise<void> => {
  return callApi(`/Transactions/favorites/${id}`, {
    method: 'DELETE',
  })
}

export const getTransactionFees = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Array<TransactionFee>> => {
  const [, data] = queryKey as [never, InternalTransferInitiateData]

  return callApi('/Transactions/Transfers/internal/fees', {
    method: 'POST',
    body: { ...data },
  })
}

export const initiateInternalTransfer = (
  data: InternalTransferInitiateData,
): Promise<TransferInitResponse> => {
  return callApi('/Transactions/Transfers/internal/initiate', {
    method: 'POST',
    body: { ...data },
  })
}

export const executeInternalTransfer = (
  data: InternalTransferExecuteData,
): Promise<TransferResponse> => {
  return callApi('/Transactions/Transfers/internal/execute', { method: 'POST', body: { ...data } })
}

export const getExtTransactionFees = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Array<TransactionFee>> => {
  const [, data] = queryKey as [never, ExternalTransferData]
  return callApi('/Transactions/Transfers/external/fees', { method: 'POST', body: { ...data } })
}

export const initExternalTransfer = (data: ExternalTransferData): Promise<TransferInitResponse> => {
  return callApi('/Transactions/Transfers/external/initiate', {
    method: 'POST',
    body: { ...data },
  })
}

export const execExternalTransfer = (
  data: ExternalTransferExecuteData,
): Promise<TransferResponse> => {
  return callApi('/Transactions/Transfers/external/execute', {
    method: 'POST',
    body: { ...data },
  })
}

export const uploadBulkFile = (data: BulkFileUploadData): Promise<BulkFileTransfer> => {
  return callApi('/Transactions/Transfers/bulk/upload-initiate', {
    method: 'POST',
    body: { ...data },
  })
}

export const initBulkTransfer = (
  data: Omit<BulkFileTransfer, 'requireSca' | 'totalAmount'>,
): Promise<BulkFileTransfer> => {
  return callApi('/Transactions/Transfers/bulk/initiate', {
    method: 'POST',
    body: { ...data },
  })
}

export const execBulkTransfer = (data: BulkFileTransfer): Promise<BulkFileTransferExecData> => {
  return callApi('/Transactions/Transfers/bulk/execute', {
    method: 'POST',
    body: { ...data },
  })
}

export const validateAccountNumber = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<ValidAccount> | undefined => {
  const [, accountNumber] = queryKey as [never, string]

  if (!accountNumber || accountNumber.length < 11) {
    return
  }

  return callApi(`/Validations/validate/accountnumber/${accountNumber}`, {
    method: 'GET',
  })
}

export const validateBic = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Array<ValidBankData>> => {
  const [, bic] = queryKey as [never, string]

  return callApi(`/Validations/validate/bic/${bic}`, {
    method: 'GET',
  })
}

export const validateIban = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<ValidBankData> => {
  const [, iban] = queryKey as [never, string]

  return callApi(`/Validations/validate/iban/${iban}`, {
    method: 'GET',
  })
}
