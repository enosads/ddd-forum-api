import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = [];

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.questionComments.find(
      item => item.id.value === id
    );
    return questionComment ?? null;
  }

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment);
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.questionComments.findIndex(
      item => item.id.value === questionComment.id.value
    );
    if (index !== -1) {
      this.questionComments.splice(index, 1);
    }
  }
}
