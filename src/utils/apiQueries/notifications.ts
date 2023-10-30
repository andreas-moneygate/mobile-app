import { QueryFunctionContext, QueryKey } from 'react-query'
import { PaginatedData } from 'types/api/common'
import { Notification } from 'types/api/notifications'
import callApi from 'utils/callApi'

export const getNotifications = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<PaginatedData<Array<Notification>>> => {
  const [, clientId] = queryKey as [never, string]

  return callApi('/Messages', {
    method: 'GET',
    // query: { clientId },
  })
}

export const readNotification = (notificationId: string, clientId?: string): Promise<void> => {
  return callApi(`/Messages/${notificationId}`, {
    method: 'PUT',
    query: { clientId },
  })
}
