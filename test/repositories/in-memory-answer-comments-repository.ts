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
