import type { Question } from "../../enterprise/entities/question";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionsRepository = {
  create: async (_question: Question) => {
    return;
  },
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);
  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Nova pergunta",
    content: "Nova resposta",
  });

  expect(question.id).toBeTruthy();
  expect(question.title).toEqual("Nova pergunta");
});
