import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(answerId: string, { page }: PaginationParams): Promise<AnswerComment[]>
  delete(id: string): Promise<void>
}
