import { jest } from "@jest/globals";

// Mock Prisma client
const mockPrismaCategory = {
  findMany: jest.fn(),
  create: jest.fn(),
  createMany: jest.fn(),
};
jest.unstable_mockModule("../../config/database.js", () => ({
  __esModule: true,
  default: { category: mockPrismaCategory },
}));

const { getAllCategories, createCategory, createDefaultCategories } =
  await import("../../services/categoryService.js");

describe("Category Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCategories", () => {
    it("should return all categories for a user ordered by name", async () => {
      const fakeCategories = [
        { id: 1, name: "Entertainment", type: "EXPENSE" },
        { id: 2, name: "Groceries", type: "EXPENSE" },
      ];
      mockPrismaCategory.findMany.mockResolvedValue(fakeCategories);
      const result = await getAllCategories(123);
      expect(mockPrismaCategory.findMany).toHaveBeenCalledWith({
        where: { userId: 123 },
        orderBy: { name: "asc" },
      });
      expect(result).toEqual(fakeCategories);
    });
  });

  describe("createCategory", () => {
    it("should create a category with provided values", async () => {
      const input = {
        name: "Travel",
        type: "EXPENSE",
        color: "#111111",
        icon: "plane",
      };
      const fakeCategory = { id: 1, ...input };
      mockPrismaCategory.create.mockResolvedValue(fakeCategory);
      const result = await createCategory(123, input);
      expect(mockPrismaCategory.create).toHaveBeenCalledWith({
        data: { userId: 123, ...input },
      });
      expect(result).toEqual(fakeCategory);
    });

    it("should use default color and icon if not provided", async () => {
      const input = { name: "Bonus", type: "INCOME" };
      const fakeCategory = {
        id: 2,
        ...input,
        color: "#3B82F6",
        icon: "dollar-sign",
      };
      mockPrismaCategory.create.mockResolvedValue(fakeCategory);
      const result = await createCategory(123, input);
      expect(mockPrismaCategory.create).toHaveBeenCalledWith({
        data: { userId: 123, ...input, color: "#3B82F6", icon: "dollar-sign" },
      });
      expect(result).toEqual(fakeCategory);
    });
  });

  describe("createDefaultCategories", () => {
    it("should create all default categories for a user", async () => {
      const userId = 123;
      mockPrismaCategory.createMany.mockResolvedValue({ count: 8 });
      const result = await createDefaultCategories(userId);
      expect(mockPrismaCategory.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({ name: "Salary", userId }),
          expect.objectContaining({ name: "Freelance", userId }),
          expect.objectContaining({ name: "Groceries", userId }),
          expect.objectContaining({ name: "Rent", userId }),
        ]),
      });
      expect(result).toEqual({ count: 8 });
    });
  });
});
