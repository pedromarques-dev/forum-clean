import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<QuestionComment[]>
  delete(id: string): Promise<void>
}
