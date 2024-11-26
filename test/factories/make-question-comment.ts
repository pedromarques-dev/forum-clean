import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment, QuestionCommentProps } from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: UniqueEntityID) {
  const newQuestionComment = QuestionComment.create({
    authorId: new UniqueEntityID('1'),
    questionId: new UniqueEntityID('1'),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return newQuestionComment
}
