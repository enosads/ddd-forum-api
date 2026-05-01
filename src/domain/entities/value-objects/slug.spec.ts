import { Slug } from "./slug";

describe("Slug", () => {
  it("should create a slug from a string", () => {
    const slug = Slug.create("Hello World");
    expect(slug.getValue()).toBe("hello-world");
  });
});
