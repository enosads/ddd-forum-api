export class Slug {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalizes it into a slug.
   *
   * @param value {string}
   * @returns {Slug}
   */
  static create(value: string): Slug {
    const slugText = value
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");
    return new Slug(slugText);
  }

  getValue(): string {
    return this.value;
  }
}
