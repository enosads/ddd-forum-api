import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID("1"),
      slug: Slug.create("nova-pergunta"),
      title: "Nova pergunta",
      content: "Nova resposta",
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "nova-pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(question.slug.value).toEqual("nova-pergunta");
  });
});
