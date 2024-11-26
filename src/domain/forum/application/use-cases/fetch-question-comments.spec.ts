import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchQuestionsCommentUseCase } from './fetch-question-comments'

let questionCommentRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionsCommentUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionsCommentUseCase(questionCommentRepository)
  })

  it('should be able to fetch question comments by question ID', async () => {
    await questionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))
    await questionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))

    const result = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(questionCommentRepository.items).toHaveLength(2)
    expect(result.value?.questionComments).toEqual([
      expect.objectContaining({ questionId: new UniqueEntityID('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityID('question-1') }),
    ])
  })

  it('should be able to fetch paginated question comment by question', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
