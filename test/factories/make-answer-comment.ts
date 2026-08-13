import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  AnswerComment,
  type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
  overrides?: Partial<AnswerCommentProps>,
  id?: UniqueEntityID
): AnswerComment {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID("1"),
      answerId: new UniqueEntityID("1"),
      content: faker.lorem.text(),
      createdAt: new Date(),
      ...overrides,
    },
    id
  );

  return answerComment;
}
