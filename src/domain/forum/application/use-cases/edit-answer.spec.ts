import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "author-1",
      content: "Conteúdo teste",
    });

    expect(inMemoryAnswerRepository.answers[0]).toMatchObject({
      content: "Conteúdo teste",
    });
  });

  it("should not be able to edit a answer from another author", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: "answer-1",
        authorId: "author-2",
        content: "Conteúdo teste",
      })
    ).rejects.toThrow("You are not the author of this answer");
  });
});
