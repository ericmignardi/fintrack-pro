import * as budgetService from "../../services/budgetService.js";
import prisma from "../../config/database.js";
import { describe, it, beforeAll, afterAll, expect, jest } from "@jest/globals";

beforeAll(() => {
  jest.spyOn(prisma.budget, "findMany");
  jest.spyOn(prisma.budget, "findUnique");
  jest.spyOn(prisma.budget, "create");
  jest.spyOn(prisma.budget, "update");
  jest.spyOn(prisma.budget, "delete");
  jest.spyOn(prisma.transaction, "aggregate");
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("budgetService", () => {
  it("findAllBudgets returns budgets", async () => {
    prisma.budget.findMany.mockResolvedValue([{ id: 1, name: "Food Budget" }]);

    const result = await budgetService.findAllBudgets(1);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Food Budget");
  });

  it("findBudgetById returns budget", async () => {
    prisma.budget.findFirst.mockResolvedValue({
      id: 1,
      userId: 1,
      name: "Food Budget",
      budgetAmount: 500,
      categoryId: 1,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    });

    prisma.transaction.aggregate.mockResolvedValue({
      _sum: { amount: 200 },
    });

    const result = await budgetService.findBudgetById(1, 1);

    expect(result.id).toBe(1);
    expect(result.actualSpent).toBe(200);
    expect(result.remainingBudget).toBe(300);
  });

  it("createBudget creates budget", async () => {
    prisma.budget.create.mockResolvedValue({ id: 2, name: "Transport Budget" });

    const result = await budgetService.createBudget(1, {
      name: "Transport Budget",
    });

    expect(result.name).toBe("Transport Budget");
  });

  it("updateBudget updates budget", async () => {
    prisma.budget.update.mockResolvedValue({ id: 1, name: "Updated Budget" });

    const result = await budgetService.updateBudget(1, 1, {
      name: "Updated Budget",
    });

    expect(result.name).toBe("Updated Budget");
  });

  it("deleteBudget deletes budget", async () => {
    prisma.budget.delete.mockResolvedValue({ id: 1 });

    const result = await budgetService.deleteBudget(1, 1);

    expect(result.id).toBe(1);
  });
});
