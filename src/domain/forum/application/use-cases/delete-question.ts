import type { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = {};

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  public async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    if (question.authorId.value !== authorId) {
      throw new Error("You are not the author of this question");
    }
    await this.questionsRepository.delete(question);
    return {};
  }
}
