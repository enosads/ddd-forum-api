import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
  instructorID: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  public execute({
    instructorID,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorID, questionId });

    return answer;
  }
}
