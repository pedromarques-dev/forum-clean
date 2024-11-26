import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepository {
  create(data: Notification): Promise<void>
  findById(id: string): Promise<Notification | null>
  update(notification: Notification): Promise<void>
}
