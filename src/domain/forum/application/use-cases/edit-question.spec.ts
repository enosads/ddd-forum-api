import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-1",
      title: "pergunta teste",
      content: "Conteúdo teste",
    });

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: "pergunta teste",
      content: "Conteúdo teste",
    });
  });

  it("should not be able to edit a question from another author", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: "question-1",
        authorId: "author-2",
        title: "pergunta teste",
        content: "Conteúdo teste",
      })
    ).rejects.toThrow("You are not the author of this question");
  });
});
