import dayjs from "dayjs";
import { Entity } from "@/core/entities/entity";
import type { Optional } from "@/core/entities/types/optional";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId | undefined;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, "days") <= 3;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  set title(value: string) {
    this.props.title = value;
    this.props.slug = Slug.create(value);
    this.touch();
  }

  set bestAnswerId(value: UniqueEntityId | undefined) {
    this.props.bestAnswerId = value;
    this.touch();
  }

  get excerpt() {
    return this.props.content.slice(0, 100).trimEnd().concat("...");
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.create(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return question;
  }
}
