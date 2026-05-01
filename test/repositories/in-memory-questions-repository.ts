import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = [];

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(question => question.id.value === id);
    return question ?? null;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      question => question.slug.value === slug
    );
    return question ?? null;
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }

  async delete(question: Question): Promise<void> {
    const index = this.questions.findIndex(item => item.id === question.id);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }
}
