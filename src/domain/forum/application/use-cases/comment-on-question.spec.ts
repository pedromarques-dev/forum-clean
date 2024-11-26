import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionsRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository(new InMemoryQuestionAttachmentsRepository())
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(questionsRepository, questionCommentsRepository)
  })

  it('should be able to comment an question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toValue(),
      content: 'Comentario Teste',
    })

    expect(questionCommentsRepository.items[0].content).toEqual('Comentario Teste')
  })
})
