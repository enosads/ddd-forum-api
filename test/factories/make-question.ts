import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  type QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
  overrides?: Partial<QuestionProps>,
  id?: UniqueEntityID
): Question {
  const question = Question.create(
    {
      authorId: new UniqueEntityID("1"),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      createdAt: new Date(),
      ...overrides,
    },
    id
  );

  return question;
}
