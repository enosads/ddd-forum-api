import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = [];

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      question => question.slug.value === slug
    );
    return question ?? null;
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }
}
