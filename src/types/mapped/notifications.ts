export interface MappedNotification {
  id: string
  isMessageRead: boolean
  title: string
  content: string
  time: string
}

export interface GroupedNotifications {
  date: string
  notifications: Array<MappedNotification>
}
