import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionsCommentUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionsCommentUseCaseResponse = Either<null, {
  questionComments: QuestionComment[]
}>

export class FetchQuestionsCommentUseCase {
  constructor(private readonly questionCommentRepository: QuestionsCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsCommentUseCaseRequest): Promise<FetchQuestionsCommentUseCaseResponse> {
    const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page })

    return right({ questionComments })
  }
}
