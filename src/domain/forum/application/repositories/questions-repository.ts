import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  update(question: Question): Promise<void>
  delete(questionId: string): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findById(id: string): Promise<Question | null>
}
