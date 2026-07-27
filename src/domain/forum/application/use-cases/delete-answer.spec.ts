import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteAnswerUseCase } from "./delete-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a Answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("Answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      AnswerId: "Answer-1",
      authorId: "author-1",
    });

    expect(inMemoryAnswersRepository.answers).toHaveLength(0);
  });

  it("should not be able to delete a Answer from another author", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("Answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        AnswerId: "Answer-1",
        authorId: "author-2",
      })
    ).rejects.toThrow("You are not the author of this Answer");
  });
});
