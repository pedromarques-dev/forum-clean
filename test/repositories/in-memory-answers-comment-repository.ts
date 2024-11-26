import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository implements AnswersCommentRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter(item => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findById(id: string) {
    const answerComment = this.items.find(item => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerCommentId: string) {
    const itemIndex = this.items.findIndex(item => item.id.toString() === answerCommentId)

    this.items.splice(itemIndex, 1)
  }
}
