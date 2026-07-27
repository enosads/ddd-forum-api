import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Answer,
  type AnswerProps,
} from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
  overrides?: Partial<AnswerProps>,
  id?: UniqueEntityID
): Answer {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID("1"),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      createdAt: new Date(),
      ...overrides,
    },
    id
  );

  return answer;
}
