import type { Answer } from "../entities/answer";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswersRepository = {
  create: async (_answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
  const answer = await answerQuestion.execute({
    instructorID: "1",
    questionId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});
