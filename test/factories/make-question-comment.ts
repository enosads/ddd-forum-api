import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  QuestionComment,
  type QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";

export function makeQuestionComment(
  overrides?: Partial<QuestionCommentProps>,
  id?: UniqueEntityID
): QuestionComment {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID("1"),
      questionId: new UniqueEntityID("1"),
      content: faker.lorem.text(),
      createdAt: new Date(),
      ...overrides,
    },
    id
  );

  return questionComment;
}
