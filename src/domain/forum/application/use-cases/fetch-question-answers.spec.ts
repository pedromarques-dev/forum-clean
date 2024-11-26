import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: InMemoryAnswersRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch Answers By Question', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(new InMemoryAnswerAttachmentsRepository())
    sut = new FetchQuestionsAnswersUseCase(answersRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await answersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))
    await answersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))

    const result = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(answersRepository.items).toHaveLength(2)
    expect(result.value?.answers).toHaveLength(2)
    expect(result.value?.answers).toEqual([
      expect.objectContaining({ questionId: new UniqueEntityID('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityID('question-1') }),
    ])
  })

  it('should be able to fetch paginated answers by question', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.value?.answers).toHaveLength(2)
  })
})
