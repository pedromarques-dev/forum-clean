import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: InMemoryAnswersRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Create answer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(new InMemoryAnswerAttachmentsRepository())
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(answersRepository, answerCommentsRepository)
  })

  it('should be able to comment an answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toValue(),
      content: 'Comentario Teste',
    })

    expect(answerCommentsRepository.items[0].content).toEqual('Comentario Teste')
  })
})
