import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ReadNotificationUseCase } from './read-notification'

let notificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(notificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    await notificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: '1',
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(notificationsRepository.items[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read an notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('1'),
    })

    await notificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: '2',
      notificationId: notification.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
