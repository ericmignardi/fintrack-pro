import { jest } from "@jest/globals";

// Mock Prisma client
const mockPrismaBudget = {
  findMany: jest.fn(),
  findFirst: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
const mockPrismaTransaction = {
  aggregate: jest.fn(),
};
jest.unstable_mockModule("../../config/database.js", () => ({
  __esModule: true,
  default: {
    budget: mockPrismaBudget,
    transaction: mockPrismaTransaction,
  },
}));

const {
  findAllBudgets,
  findBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
} = await import("../../services/budgetService.js");

describe("Budget Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAllBudgets", () => {
    it("should return all budgets for a user including category, ordered by creation date", async () => {
      const fakeBudgets = [
        { id: 1, budgetAmount: 500, category: { id: 2, name: "Groceries" } },
      ];
      mockPrismaBudget.findMany.mockResolvedValue(fakeBudgets);
      const result = await findAllBudgets(123);
      expect(mockPrismaBudget.findMany).toHaveBeenCalledWith({
        where: { userId: 123 },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual(fakeBudgets);
    });
  });

  describe("findBudgetById", () => {
    it("should return budget with calculated actualSpent and remainingBudget", async () => {
      const fakeBudget = {
        id: 1,
        userId: 123,
        budgetAmount: 500,
        categoryId: 2,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
        category: { id: 2, name: "Groceries" },
      };
      mockPrismaBudget.findFirst.mockResolvedValue(fakeBudget);
      mockPrismaTransaction.aggregate.mockResolvedValue({
        _sum: { amount: 200 },
      });
      const result = await findBudgetById(123, 1);
      expect(mockPrismaBudget.findFirst).toHaveBeenCalledWith({
        where: { userId: 123, id: 1 },
        include: { category: true },
      });
      expect(mockPrismaTransaction.aggregate).toHaveBeenCalledWith({
        where: {
          userId: 123,
          categoryId: 2,
          transactionDate: {
            gte: fakeBudget.startDate,
            lte: fakeBudget.endDate,
          },
          type: "EXPENSE",
        },
        _sum: { amount: true },
      });
      expect(result.actualSpent).toBe(200);
      expect(result.remainingBudget).toBe(300);
    });

    it("should return budget with 0 actualSpent if no transactions exist", async () => {
      const fakeBudget = {
        id: 1,
        userId: 123,
        budgetAmount: 500,
        categoryId: 2,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
        category: { id: 2, name: "Groceries" },
      };
      mockPrismaBudget.findFirst.mockResolvedValue(fakeBudget);
      mockPrismaTransaction.aggregate.mockResolvedValue({
        _sum: { amount: null },
      });
      const result = await findBudgetById(123, 1);
      expect(result.actualSpent).toBe(0);
      expect(result.remainingBudget).toBe(500);
    });

    it("should return null if budget not found", async () => {
      mockPrismaBudget.findFirst.mockResolvedValue(null);
      const result = await findBudgetById(123, 1);
      expect(result).toBeNull();
    });
  });

  describe("createBudget", () => {
    it("should create a budget and include category", async () => {
      const input = {
        budgetAmount: 500,
        categoryId: 2,
        startDate: new Date(),
        endDate: new Date(),
      };
      const fakeBudget = {
        id: 1,
        ...input,
        category: { id: 2, name: "Groceries" },
      };
      mockPrismaBudget.create.mockResolvedValue(fakeBudget);
      const result = await createBudget(123, input);
      expect(mockPrismaBudget.create).toHaveBeenCalledWith({
        data: { userId: 123, ...input },
        include: { category: true },
      });
      expect(result).toEqual(fakeBudget);
    });
  });

  describe("updateBudget", () => {
    it("should update budget successfully", async () => {
      const input = { budgetAmount: 600 };
      const fakeBudget = {
        id: 1,
        ...input,
        category: { id: 2, name: "Groceries" },
      };
      mockPrismaBudget.update.mockResolvedValue(fakeBudget);
      const result = await updateBudget(123, 1, input);
      expect(mockPrismaBudget.update).toHaveBeenCalledWith({
        where: { id: 1, userId: 123 },
        data: input,
        include: { category: true },
      });
      expect(result).toEqual(fakeBudget);
    });
  });

  describe("deleteBudget", () => {
    it("should delete budget successfully", async () => {
      const fakeBudget = { id: 1, budgetAmount: 500 };
      mockPrismaBudget.delete.mockResolvedValue(fakeBudget);
      const result = await deleteBudget(123, 1);
      expect(mockPrismaBudget.delete).toHaveBeenCalledWith({
        where: { id: 1, userId: 123 },
      });
      expect(result).toEqual(fakeBudget);
    });
  });
});
