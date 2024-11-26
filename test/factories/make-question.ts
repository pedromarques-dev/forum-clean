import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID) {
  const newQuestion = Question.create({
    title: faker.lorem.sentence(3),
    slug: Slug.create('example-question-title'),
    authorId: new UniqueEntityID('1'),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return newQuestion
}
