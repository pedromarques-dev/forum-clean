import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answer-comment-repository'

interface FetchAnswersCommentUseCaseRequest {
  page: number
  answerId: string
}

type FetchAnswersCommentUseCaseResponse = Either<null, {
  answerComments: AnswerComment[]
}>

export class FetchAnswersCommentUseCase {
  constructor(private readonly answerCommentRepository: AnswersCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswersCommentUseCaseRequest): Promise<FetchAnswersCommentUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

    return right({ answerComments })
  }
}
