import type { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  AnswerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}
  public async execute({
    authorId,
    AnswerId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const Answer = await this.AnswersRepository.findById(AnswerId);
    if (!Answer) {
      throw new Error("Answer not found");
    }
    if (Answer.authorId.value !== authorId) {
      throw new Error("You are not the author of this Answer");
    }
    await this.AnswersRepository.delete(Answer);
  }
}
