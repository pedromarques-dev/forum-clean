import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let answersRepository: InMemoryAnswersRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Best Answer for Question', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(new InMemoryAnswerAttachmentsRepository())
    questionsRepository = new InMemoryQuestionsRepository(new InMemoryQuestionAttachmentsRepository())
    sut = new ChooseQuestionBestAnswerUseCase(questionsRepository, answersRepository)
  })

  it('should be able to choose the question best answer', async () => {
    const newQuestion = makeQuestion()
    const answer = makeAnswer({ content: 'Best answer', questionId: newQuestion.id })

    await questionsRepository.create(newQuestion)
    await answersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(result.isRight()).toEqual(true)
    expect(questionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose a best answer from another user', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    const answer = makeAnswer({ content: 'Best answer', questionId: newQuestion.id })

    await questionsRepository.create(newQuestion)
    await answersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
