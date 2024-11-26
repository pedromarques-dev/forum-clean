import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchAnswersCommentUseCase } from './fetch-answers-comments'

let answerCommentRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswersCommentUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswersCommentUseCase(answerCommentRepository)
  })

  it('should be able to fetch answer comments by answer ID', async () => {
    await answerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }))
    await answerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }))

    const result = await sut.execute({ answerId: 'answer-1', page: 1 })

    expect(answerCommentRepository.items).toHaveLength(2)
    expect(result.value?.answerComments).toEqual([
      expect.objectContaining({ answerId: new UniqueEntityID('answer-1') }),
      expect.objectContaining({ answerId: new UniqueEntityID('answer-1') }),
    ])
  })

  it('should be able to fetch paginated answer comment by answer', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }))
    }

    const result = await sut.execute({ answerId: 'answer-1', page: 2 })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
