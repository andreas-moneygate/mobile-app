import { QueryFunctionContext, QueryKey } from 'react-query'
import { PaginatedData } from 'types/api/common'
import { Client, ClientBalance } from 'types/api/user'
import callApi from 'utils/callApi'

export const getClients = (): Promise<PaginatedData<Array<Client>>> => {
  return callApi(`/Clients/summary`, { method: 'GET' })
}

export const getClientConvertedBalance = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<ClientBalance> | undefined => {
  const [, clientId, currencyCode] = queryKey

  return callApi(`/Clients/${clientId}/convertbalances`, { method: 'GET', query: { currencyCode } })
}

export const getClientAnalytics = ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [, clientId] = queryKey

  if (!clientId) {
    return
  }

  return callApi(`/Clients/${clientId}/analytics`, { method: 'GET' })
}

export const getClientsSummaryStatements = (clientId: string): Promise<any> => {
  return callApi(`/Clients/${clientId}/statement`, {
    method: 'GET',
    isText: true,
  })
}

export const getClientStatements = (clientId: string, query: any): Promise<string> => {
  return callApi(`/Clients/${clientId}/detailstatement`, {
    method: 'GET',
    query,
    isText: true,
  })
}
