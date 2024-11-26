import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionsAnswersUseCaseResponse = Either<null, {
  answers: Answer[]
}>

export class FetchQuestionsAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return right({ answers })
  }
}
