import { jest } from "@jest/globals";

const mockPrismaTransaction = {
  findMany: jest.fn(),
  findUnique: jest.fn(),
  findFirst: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
const mockPrismaCategory = {
  findUnique: jest.fn(),
};
jest.unstable_mockModule("../../config/database.js", () => ({
  __esModule: true,
  default: {
    transaction: mockPrismaTransaction,
    category: mockPrismaCategory,
  },
}));

const {
  findAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  findTransactionsByCategory,
  findTransactionById,
} = await import("../../services/transactionService.js");

describe("Transaction Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAllTransactions", () => {
    it("should return all transactions for a user, including category, ordered by date", async () => {
      const fakeTransactions = [
        { id: 1, amount: 100, category: { id: 1, name: "Salary" } },
      ];
      mockPrismaTransaction.findMany.mockResolvedValue(fakeTransactions);
      const result = await findAllTransactions(123);
      expect(mockPrismaTransaction.findMany).toHaveBeenCalledWith({
        where: { userId: 123 },
        include: { category: true },
        orderBy: { transactionDate: "desc" },
      });
      expect(result).toEqual(fakeTransactions);
    });
  });

  describe("createTransaction", () => {
    it("should create a transaction with provided data", async () => {
      const input = { amount: 50, categoryId: 2, description: "Dinner" };
      const fakeTransaction = {
        id: 1,
        ...input,
        category: { id: 2, name: "Food" },
      };
      mockPrismaTransaction.create.mockResolvedValue(fakeTransaction);
      const result = await createTransaction(123, input);
      expect(mockPrismaTransaction.create).toHaveBeenCalledWith({
        data: { ...input, userId: 123 },
        include: { category: true },
      });
      expect(result).toEqual(fakeTransaction);
    });
  });

  describe("updateTransaction", () => {
    it("should update a transaction successfully if user owns it and category is valid", async () => {
      const existing = { id: 1, userId: 123, categoryId: 2 };
      mockPrismaTransaction.findUnique.mockResolvedValue(existing);
      mockPrismaCategory.findUnique.mockResolvedValue({ id: 2, userId: 123 });
      const updated = { id: 1, amount: 200, category: { id: 2, name: "Food" } };
      mockPrismaTransaction.update.mockResolvedValue(updated);
      const result = await updateTransaction(1, 123, {
        amount: 200,
        categoryId: 2,
      });
      expect(result).toEqual(updated);
      expect(mockPrismaTransaction.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { amount: 200, categoryId: 2 },
        include: { category: true },
      });
    });

    it("should throw P2025 error if transaction not found or owned by another user", async () => {
      mockPrismaTransaction.findUnique.mockResolvedValue(null);
      await expect(
        updateTransaction(1, 123, { amount: 200 })
      ).rejects.toMatchObject({
        message: "Transaction not found.",
        code: "P2025",
      });
    });

    it("should throw CATEGORY_NOT_FOUND if category invalid", async () => {
      const existing = { id: 1, userId: 123 };
      mockPrismaTransaction.findUnique.mockResolvedValue(existing);
      mockPrismaCategory.findUnique.mockResolvedValue({ id: 2, userId: 999 }); // wrong owner
      await expect(
        updateTransaction(1, 123, { categoryId: 2 })
      ).rejects.toMatchObject({
        message: "Invalid category.",
        code: "CATEGORY_NOT_FOUND",
      });
    });
  });

  describe("deleteTransaction", () => {
    it("should delete a transaction successfully if owned by user", async () => {
      const existing = { id: 1, userId: 123 };
      mockPrismaTransaction.findUnique.mockResolvedValue(existing);
      const deleted = { id: 1, amount: 50, category: { id: 2, name: "Food" } };
      mockPrismaTransaction.delete.mockResolvedValue(deleted);
      const result = await deleteTransaction(1, 123);
      expect(result).toEqual(deleted);
      expect(mockPrismaTransaction.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { category: true },
      });
    });

    it("should throw P2025 error if transaction not found or owned by another user", async () => {
      mockPrismaTransaction.findUnique.mockResolvedValue(null);
      await expect(deleteTransaction(1, 123)).rejects.toMatchObject({
        message: "Transaction not found.",
        code: "P2025",
      });
    });
  });

  describe("findTransactionsByCategory", () => {
    it("should return transactions filtered by category", async () => {
      const fakeTransactions = [
        { id: 1, amount: 50, category: { id: 2, name: "Food" } },
      ];
      mockPrismaTransaction.findMany.mockResolvedValue(fakeTransactions);
      const result = await findTransactionsByCategory(123, 2);
      expect(mockPrismaTransaction.findMany).toHaveBeenCalledWith({
        where: { userId: 123, categoryId: 2 },
        include: { category: true },
        orderBy: { transactionDate: "desc" },
      });
      expect(result).toEqual(fakeTransactions);
    });
  });

  describe("findTransactionById", () => {
    it("should return the transaction if found", async () => {
      const fakeTransaction = {
        id: 1,
        amount: 50,
        category: { id: 2, name: "Food" },
      };
      mockPrismaTransaction.findFirst.mockResolvedValue(fakeTransaction);
      const result = await findTransactionById(123, 1);
      expect(mockPrismaTransaction.findFirst).toHaveBeenCalledWith({
        where: { id: 1, userId: 123 },
        include: { category: true },
      });
      expect(result).toEqual(fakeTransaction);
    });
  });
});
