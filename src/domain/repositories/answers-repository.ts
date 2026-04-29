import type { Answer } from "../entities/answer";

export type AnswersRepository = {
  create: (answer: Answer) => Promise<void>;
};
