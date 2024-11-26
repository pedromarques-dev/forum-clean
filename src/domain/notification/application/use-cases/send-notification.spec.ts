import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SendNotificationUseCase } from './send-notification'

let notificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(notificationsRepository)
  })

  it('should be able to send an notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Teste',
      content: 'Nova notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(notificationsRepository.items[0]).toEqual(result.value?.notification)
  })
})
