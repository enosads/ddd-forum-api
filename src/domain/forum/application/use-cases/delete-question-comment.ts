import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}
  public async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<void> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question comment not found");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this question comment");
    }

    await this.questionCommentRepository.delete(questionComment);
  }
}
