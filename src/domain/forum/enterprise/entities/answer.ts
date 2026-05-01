import { Entity } from "@/core/entities/entity";
import type { Optional } from "@/core/entities/types/optional";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get content() {
    return this.props.content;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.props.content.slice(0, 100).trimEnd().concat("...");
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const answer = new Answer(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    );

    return answer;
  }
}
