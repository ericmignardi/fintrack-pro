import request from "supertest";
import app from "../../app.js";
import * as budgetService from "../../services/budgetService.js";
import { describe, it, beforeAll, afterAll, expect, jest } from "@jest/globals";

let token = "mocked-token";

beforeAll(() => {
  jest.spyOn(budgetService, "findAllBudgets").mockResolvedValue([
    {
      id: 1,
      name: "Monthly Food",
      budgetAmount: 500,
      period: "MONTHLY",
      categoryId: 1,
      startDate: "2025-01-01",
      endDate: "2025-01-31",
    },
  ]);

  jest
    .spyOn(budgetService, "findBudgetById")
    .mockImplementation(async (userId, id) => {
      if (id === 999) return null;
      return {
        id,
        userId,
        name: "Monthly Food",
        budgetAmount: 500,
        period: "MONTHLY",
        categoryId: 1,
        startDate: "2025-01-01",
        endDate: "2025-01-31",
        actualSpent: 200,
        remainingBudget: 300,
      };
    });

  jest
    .spyOn(budgetService, "createBudget")
    .mockImplementation(async (userId, data) => ({
      id: 2,
      userId,
      ...data,
    }));

  jest
    .spyOn(budgetService, "updateBudget")
    .mockImplementation(async (userId, id, data) => ({
      id,
      userId,
      ...data,
    }));

  jest.spyOn(budgetService, "deleteBudget").mockResolvedValue({ id: 1 });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Budgets API", () => {
  it("GET /api/budgets returns all budgets", async () => {
    const res = await request(app)
      .get("/api/budgets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.budgets.length).toBeGreaterThan(0);
    expect(res.body.budgets[0].name).toBe("Monthly Food");
  });

  it("GET /api/budgets/:id returns a budget", async () => {
    const res = await request(app)
      .get("/api/budgets/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.budget.id).toBe(1);
    expect(res.body.budget.actualSpent).toBeDefined();
    expect(res.body.budget.remainingBudget).toBeDefined();
  });

  it("GET /api/budgets/:id returns 404 if not found", async () => {
    const res = await request(app)
      .get("/api/budgets/999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /api/budgets creates a budget", async () => {
    const res = await request(app)
      .post("/api/budgets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categoryId: 1,
        name: "New Budget",
        budgetAmount: 300,
        period: "MONTHLY",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.budget.name).toBe("New Budget");
  });

  it("PUT /api/budgets/:id updates a budget", async () => {
    const res = await request(app)
      .put("/api/budgets/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categoryId: 1,
        name: "Updated Budget",
        budgetAmount: 400,
        period: "MONTHLY",
        startDate: "2025-01-01",
        endDate: "2025-01-31",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.budget.name).toBe("Updated Budget");
  });

  it("DELETE /api/budgets/:id deletes a budget", async () => {
    const res = await request(app)
      .delete("/api/budgets/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Budget deleted successfully.");
  });
});
