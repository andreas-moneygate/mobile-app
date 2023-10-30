import moment from 'moment'
import { Notification } from 'types/api/notifications'
import { GroupedNotifications } from 'types/mapped/notifications'
import { formatDate, formatTime, formatWeekDayMonth } from 'utils/date'

export const mapNotificationData = (
  notifications: Array<Notification>,
): Array<GroupedNotifications> => {
  const filtered = notifications
    .sort((a, b) => {
      if (moment(a.createdAt).isAfter(b.createdAt)) {
        return -1
      }
      if (moment(a.createdAt).isBefore(b.createdAt)) {
        return 1
      }
      return 0
    })

  const grouped = filtered.reduce((acc: Array<GroupedNotifications>, notification) => {
    const groupIsDefined = acc.some(
      groupedByDate => groupedByDate.date === formatWeekDayMonth(notification.createdAt),
    )

    if (groupIsDefined) {
      return acc
    }

    const notificationsWithTheSameDate = filtered.filter(
      ntf => formatDate(ntf.createdAt) === formatDate(notification.createdAt),
    )
    const groupedByDate = {
      date: formatWeekDayMonth(notification.createdAt),
      notifications: notificationsWithTheSameDate.map(ntf => ({
        title: ntf.title,
        content: ntf.content,
        id: ntf.id,
        isMessageRead: ntf.isMessageRead,
        time: formatTime(ntf.createdAt),
      })),
    }

    acc.push(groupedByDate)

    return acc
  }, [])

  return grouped
}
