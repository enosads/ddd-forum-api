import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = [];

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.answerComments.find(
      item => item.id.value === id
    );
    return answerComment ?? null;
  }

  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComment[]> {
    const { page } = params;
    const answerComments = this.answerComments
      .filter(answerComment => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);
    return answerComments;
  }

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.answerComments.findIndex(
      item => item.id.value === answerComment.id.value
    );
    if (index !== -1) {
      this.answerComments.splice(index, 1);
    }
  }
}
