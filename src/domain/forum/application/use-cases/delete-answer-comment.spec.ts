import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(answerCommentsRepository)
  })

  it('should be able to delete an answer comment', async () => {
    const answerComment = makeAnswerComment({ authorId: new UniqueEntityID('author-1') })

    await answerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: 'author-1',
      answerCommentId: answerComment.id.toValue(),
    })

    expect(answerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer comment from another user', async () => {
    const answerComment = makeAnswerComment({ authorId: new UniqueEntityID('author-1') })

    await answerCommentsRepository.create(answerComment)

    const result = await sut.execute({
      authorId: 'author21',
      answerCommentId: answerComment.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
