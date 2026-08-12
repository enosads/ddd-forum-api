import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find(item => item.id.value === id);
    return answer ?? null;
  }
  async create(answer: Answer) {
    this.answers.push(answer);
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex(item => item.id === answer.id);
    if (index !== -1) {
      this.answers.splice(index, 1);
    }
  }

  async save(answer: Answer): Promise<void> {
    const index = this.answers.findIndex(item => item.id === answer.id);
    if (index !== -1) {
      this.answers[index] = answer;
    } else {
      this.answers.push(answer);
    }
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]> {
    const { page } = params;
    const answers = this.answers
      .filter(answer => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);
    return answers;
  }
}
