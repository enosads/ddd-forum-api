import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  type QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(overrides?: Partial<QuestionProps>): Question {
  const question = Question.create({
    authorId: new UniqueEntityID("1"),
    title: "Nova pergunta",
    content: "Nova resposta",
    createdAt: new Date(),
    ...overrides,
  });

  return question;
}
