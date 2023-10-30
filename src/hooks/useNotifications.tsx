import useClients from 'hooks/useClients'
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PaginatedData } from 'types/api/common'
import { Notification } from 'types/api/notifications'
import {
  getNotifications,
  readNotification as readNotificationApi,
} from 'utils/apiQueries/notifications'
import { mapNotificationData } from 'utils/mappers/mapNotificationData'

const useNotifications = () => {
  const queryClient = useQueryClient()

  const { selectedClient } = useClients()

  const { data: notificationsData } = useQuery(
    ['notifications'],
    getNotifications,
    // { enabled: Boolean(selectedClient.id) },
  )

  const notifications = useMemo(
    () => (notificationsData?.data ? mapNotificationData(notificationsData.data) : []),
    [notificationsData?.data],
  )

  const isThereUnreadNotification = useMemo(
    () => notifications.some(group => group.notifications.some(ntf => !ntf.isMessageRead)),
    [notifications],
  )

  const updateNotificationData = (_: never, notificationId: string) => {
    queryClient.setQueryData(
      ['notifications', selectedClient.id],
      (
        notificationsData: PaginatedData<Array<Notification>> | undefined,
      ): PaginatedData<Array<Notification>> => ({
        ...(notificationsData as PaginatedData<Array<Notification>>),
        data:
          notificationsData?.data.map(notification =>
            notification.id === notificationId
              ? { ...notification, isMessageRead: true }
              : notification,
          ) || [],
      }),
    )
  }

  const handleReadNotification = async (notificationId: string) => {
    if (selectedClient.id) {
      await readNotificationApi(notificationId, selectedClient.id)
    }
  }

  const { mutate: readNotification } = useMutation(handleReadNotification as never, {
    onSuccess: updateNotificationData,
  })

  return { notifications, isThereUnreadNotification, readNotification }
}

export default useNotifications
