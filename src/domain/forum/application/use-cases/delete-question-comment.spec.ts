import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(questionCommentsRepository)
  })

  it('should be able to delete an question comment', async () => {
    const questionComment = makeQuestionComment({ authorId: new UniqueEntityID('author-1') })

    await questionCommentsRepository.create(questionComment)

    await sut.execute({
      authorId: 'author-1',
      questionCommentId: questionComment.id.toValue(),
    })

    expect(questionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an question comment from another user', async () => {
    const questionComment = makeQuestionComment({ authorId: new UniqueEntityID('author-1') })

    await questionCommentsRepository.create(questionComment)

    const result = await sut.execute({
      authorId: 'author21',
      questionCommentId: questionComment.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
