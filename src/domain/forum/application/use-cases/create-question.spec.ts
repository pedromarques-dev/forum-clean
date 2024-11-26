import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('Create question', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository(new InMemoryQuestionAttachmentsRepository())
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create an question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Teste',
      content: 'Nova pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question).toMatchObject({
      title: 'Teste',
    })
    expect(questionsRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(questionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
