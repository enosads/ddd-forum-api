import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  findById: (id: string) => Promise<AnswerComment | null>;
  findManyByAnswerId: (
    questionId: string,
    params: PaginationParams
  ) => Promise<AnswerComment[]>;
  create: (AnswerComment: AnswerComment) => Promise<void>;
  delete: (AnswerComment: AnswerComment) => Promise<void>;
}
