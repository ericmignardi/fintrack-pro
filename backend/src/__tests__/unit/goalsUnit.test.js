import * as goalService from "../../services/goalService.js";
import prisma from "../../config/database.js";
import { describe, it, beforeAll, afterAll, expect, jest } from "@jest/globals";

beforeAll(() => {
  jest.spyOn(prisma.financialGoal, "findMany");
  jest.spyOn(prisma.financialGoal, "findFirst");
  jest.spyOn(prisma.financialGoal, "create");
  jest.spyOn(prisma.financialGoal, "update");
  jest.spyOn(prisma.financialGoal, "delete");
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("goalService.findAllGoals", () => {
  it("returns all goals", async () => {
    prisma.financialGoal.findMany.mockResolvedValue([
      { id: 1, title: "Buy a car", targetAmount: 10000, status: "ACTIVE" },
    ]);

    const result = await goalService.findAllGoals(1);

    expect(prisma.financialGoal.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      orderBy: { createdAt: "desc" },
    });
    expect(result[0].title).toBe("Buy a car");
  });
});

describe("goalService.findById", () => {
  it("returns a goal if found", async () => {
    prisma.financialGoal.findFirst.mockResolvedValue({
      id: 1,
      userId: 1,
      title: "Car",
    });

    const result = await goalService.findById(1, 1);

    expect(result.title).toBe("Car");
  });

  it("returns null if not found", async () => {
    prisma.financialGoal.findFirst.mockResolvedValue(null);

    const result = await goalService.findById(1, 999);
    expect(result).toBeNull();
  });
});

describe("goalService.createGoal", () => {
  it("creates a new goal", async () => {
    const data = {
      title: "House",
      targetAmount: 200000,
      targetDate: new Date(),
    };
    prisma.financialGoal.create.mockResolvedValue({
      id: 2,
      userId: 1,
      ...data,
    });

    const result = await goalService.createGoal(1, data);
    expect(result.title).toBe("House");
  });
});

describe("goalService.updateGoal", () => {
  it("updates a goal", async () => {
    const data = { title: "Updated Goal" };
    prisma.financialGoal.update.mockResolvedValue({
      id: 1,
      userId: 1,
      ...data,
    });

    const result = await goalService.updateGoal(1, 1, data);
    expect(result.title).toBe("Updated Goal");
  });
});

describe("goalService.deleteGoal", () => {
  it("deletes a goal", async () => {
    prisma.financialGoal.delete.mockResolvedValue({ id: 1 });

    const result = await goalService.deleteGoal(1, 1);
    expect(result).toEqual({ id: 1 });
  });
});
