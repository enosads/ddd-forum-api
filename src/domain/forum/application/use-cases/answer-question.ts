import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorID: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    instructorID,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorID),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
