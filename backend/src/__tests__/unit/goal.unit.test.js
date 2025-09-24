import { jest } from "@jest/globals";

const mockPrismaGoal = {
  findMany: jest.fn(),
  findFirst: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.unstable_mockModule("../../config/database.js", () => ({
  __esModule: true,
  default: { financialGoal: mockPrismaGoal },
}));

const { findAllGoals, findById, createGoal, updateGoal, deleteGoal } =
  await import("../../services/goalService.js");

describe("Goal Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAllGoals", () => {
    it("should return all goals for a user ordered by creation date", async () => {
      const fakeGoals = [{ id: 1, title: "Buy a car", targetAmount: 5000 }];
      mockPrismaGoal.findMany.mockResolvedValue(fakeGoals);
      const result = await findAllGoals(123);
      expect(mockPrismaGoal.findMany).toHaveBeenCalledWith({
        where: { userId: 123 },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual(fakeGoals);
    });
  });

  describe("findById", () => {
    it("should return the goal if it exists", async () => {
      const fakeGoal = {
        id: 1,
        userId: 123,
        title: "Vacation",
        targetAmount: 2000,
      };
      mockPrismaGoal.findFirst.mockResolvedValue(fakeGoal);
      const result = await findById(123, 1);
      expect(mockPrismaGoal.findFirst).toHaveBeenCalledWith({
        where: { id: 1, userId: 123 },
      });
      expect(result).toEqual(fakeGoal);
    });

    it("should return null if the goal does not exist", async () => {
      mockPrismaGoal.findFirst.mockResolvedValue(null);
      const result = await findById(123, 1);
      expect(result).toBeNull();
    });
  });

  describe("createGoal", () => {
    it("should create a new goal", async () => {
      const input = { title: "Emergency Fund", targetAmount: 1000 };
      const fakeGoal = { id: 1, userId: 123, ...input };
      mockPrismaGoal.create.mockResolvedValue(fakeGoal);
      const result = await createGoal(123, input);
      expect(mockPrismaGoal.create).toHaveBeenCalledWith({
        data: { userId: 123, ...input },
      });
      expect(result).toEqual(fakeGoal);
    });
  });

  describe("updateGoal", () => {
    it("should update an existing goal", async () => {
      const input = { title: "Updated Goal", targetAmount: 1500 };
      const fakeGoal = { id: 1, userId: 123, ...input };
      mockPrismaGoal.update.mockResolvedValue(fakeGoal);
      const result = await updateGoal(123, 1, input);
      expect(mockPrismaGoal.update).toHaveBeenCalledWith({
        where: { id: 1, userId: 123 },
        data: input,
      });
      expect(result).toEqual(fakeGoal);
    });
  });

  describe("deleteGoal", () => {
    it("should delete the goal", async () => {
      const fakeGoal = { id: 1, userId: 123 };
      mockPrismaGoal.delete.mockResolvedValue(fakeGoal);
      const result = await deleteGoal(123, 1);
      expect(mockPrismaGoal.delete).toHaveBeenCalledWith({
        where: { id: 1, userId: 123 },
      });
      expect(result).toEqual(fakeGoal);
    });
  });
});
