import type { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  public async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    if (question.authorId.value !== authorId) {
      throw new Error("You are not the author of this question");
    }
    question.title = title;
    question.content = content;
    await this.questionsRepository.save(question);
  }
}
