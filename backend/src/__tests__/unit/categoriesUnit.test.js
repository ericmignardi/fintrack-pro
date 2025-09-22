import * as categoryService from "../../services/categoryService.js";
import prisma from "../../config/database.js";
import { describe, it, beforeAll, afterAll, expect, jest } from "@jest/globals";

beforeAll(() => {
  jest.spyOn(prisma.category, "findMany");
  jest.spyOn(prisma.category, "create");
  jest.spyOn(prisma.category, "createMany");
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("categoryService.getAllCategories", () => {
  it("returns categories sorted by name", async () => {
    prisma.category.findMany.mockResolvedValue([
      { id: 1, name: "Groceries", type: "EXPENSE" },
      { id: 2, name: "Salary", type: "INCOME" },
    ]);

    const result = await categoryService.getAllCategories(1);

    expect(prisma.category.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      orderBy: { name: "asc" },
    });
    expect(result.length).toBe(2);
  });
});

describe("categoryService.createCategory", () => {
  it("creates a new category", async () => {
    const data = {
      name: "Books",
      type: "EXPENSE",
      color: "#123456",
      icon: "book",
    };
    prisma.category.create.mockResolvedValue({ id: 3, userId: 1, ...data });

    const result = await categoryService.createCategory(1, data);

    expect(prisma.category.create).toHaveBeenCalled();
    expect(result.name).toBe("Books");
  });
});

describe("categoryService.createDefaultCategories", () => {
  it("inserts default categories", async () => {
    prisma.category.createMany.mockResolvedValue({ count: 8 });

    const result = await categoryService.createDefaultCategories(1);

    expect(prisma.category.createMany).toHaveBeenCalled();
    expect(result.count).toBe(8);
  });
});
