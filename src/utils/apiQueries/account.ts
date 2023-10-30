import { QueryFunctionContext, QueryKey } from 'react-query'
import { Account, Accounts } from 'types/api/account'
import callApi from 'utils/callApi'

export const getAccounts = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Accounts> | undefined => {
  const [, clientId, query] = queryKey

  return callApi(`/Clients/${clientId}/accounts`, {
    method: 'GET',
    query: query || { p: 0, pSize: 100 },
  })
}

export const getAccount = (accountNumber: string): Promise<Account> => {
  return callApi(`/Accounts/${accountNumber}`, {
    method: 'GET',
  })
}

export const getAccountAnalytics = ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [, accountNumber, dateBorders] = queryKey

  if (!accountNumber) {
    return undefined
  }

  return callApi(`/Accounts/${accountNumber}/analytics`, {
    method: 'GET',
    query: { fromDate: dateBorders?.start, toDate: dateBorders?.end },
  })
}

export const getAccountStatement = (accountNumber: string, query?: any) => {
  return callApi(`/Accounts/${accountNumber}/accountstatement`, {
    method: 'GET',
    query,
    isText: true,
  })
}

export const getFeeStatement = (accountNumber: string, query: any) => {
  return callApi(`/Accounts/${accountNumber}/accountfeesstatement`, {
    method: 'GET',
    query,
    isText: true,
  })
}

export const getAccountDetailsCertificate = (accountNumber: string) => {
  return callApi(`/Accounts/${accountNumber}/certificate`, { method: 'GET', isText: true })
}

type UpdateAccountData = { accountNumber: string; value: string }
export const updateAccountAlias = ({ accountNumber, value: accountAlias }: UpdateAccountData) => {
  return callApi(`/Accounts/${accountNumber}`, { method: 'PATCH', body: { accountAlias } })
}
