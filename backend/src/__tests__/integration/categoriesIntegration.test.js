import request from "supertest";
import app from "../../app.js";
import * as categoryService from "../../services/categoryService.js";
import { describe, it, beforeAll, afterAll, expect, jest } from "@jest/globals";

let token = "mocked-token";

beforeAll(() => {
  jest
    .spyOn(categoryService, "getAllCategories")
    .mockResolvedValue([{ id: 1, name: "Groceries", type: "EXPENSE" }]);

  jest
    .spyOn(categoryService, "createCategory")
    .mockImplementation(async (userId, data) => ({
      id: 2,
      userId,
      ...data,
    }));
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Categories API", () => {
  it("GET /api/categories returns categories", async () => {
    const res = await request(app)
      .get("/api/categories")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.categories.length).toBeGreaterThan(0);
  });

  it("POST /api/categories creates a category", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Books", type: "EXPENSE" });

    expect(res.statusCode).toBe(201);
    expect(res.body.category.name).toBe("Books");
  });
});
