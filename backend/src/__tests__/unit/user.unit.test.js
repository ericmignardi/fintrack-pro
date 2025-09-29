import { jest } from "@jest/globals";

const mockPrismaUser = {
  findUnique: jest.fn(),
  create: jest.fn(),
};
jest.unstable_mockModule("../../config/database.js", () => ({
  __esModule: true,
  default: { user: mockPrismaUser },
}));

const mockBcrypt = {
  hash: jest.fn(),
  compare: jest.fn(),
};
jest.unstable_mockModule("bcryptjs", () => ({
  __esModule: true,
  default: mockBcrypt,
}));

const mockGenerateToken = jest.fn();
jest.unstable_mockModule("../../utils/token.js", () => ({
  __esModule: true,
  generateToken: mockGenerateToken,
}));

const mockCreateDefaultCategories = jest.fn();
jest.unstable_mockModule("../../services/categoryService.js", () => ({
  __esModule: true,
  createDefaultCategories: mockCreateDefaultCategories,
}));

const { register, login } = await import("../../services/authService.js");

describe("User (Auth) Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should create a new user and return token + safe user", async () => {
      mockPrismaUser.findUnique.mockResolvedValue(null); // no existing user
      mockBcrypt.hash.mockResolvedValue("hashedpw");
      mockPrismaUser.create.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        passwordHash: "hashedpw",
        firstName: "John",
        lastName: "Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockGenerateToken.mockReturnValue("mocktoken");
      const result = await register(
        "test@example.com",
        "plainpw",
        "John",
        "Doe"
      );
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(mockBcrypt.hash).toHaveBeenCalledWith("plainpw", 10);
      expect(mockPrismaUser.create).toHaveBeenCalledWith({
        data: {
          email: "test@example.com",
          passwordHash: "hashedpw",
          firstName: "John",
          lastName: "Doe",
        },
      });
      expect(mockCreateDefaultCategories).toHaveBeenCalledWith(1);
      expect(mockGenerateToken).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, email: "test@example.com" })
      );
      expect(result).toEqual({
        token: "mocktoken",
        user: expect.objectContaining({
          id: 1,
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
        }),
      });
      expect(result.user).not.toHaveProperty("passwordHash");
    });

    it("should throw error if email already exists", async () => {
      mockPrismaUser.findUnique.mockResolvedValue({
        id: 1,
        email: "taken@test.com",
      });
      await expect(
        register("taken@test.com", "pw", "Jane", "Doe")
      ).rejects.toThrow("Email already in use");
      expect(mockPrismaUser.create).not.toHaveBeenCalled();
      expect(mockCreateDefaultCategories).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should login with valid credentials", async () => {
      const fakeUser = {
        id: 2,
        email: "login@test.com",
        passwordHash: "hashedpw",
        firstName: "Alice",
        lastName: "Smith",
      };
      mockPrismaUser.findUnique.mockResolvedValue(fakeUser);
      mockBcrypt.compare.mockResolvedValue(true);
      mockGenerateToken.mockReturnValue("logintoken");
      const result = await login("login@test.com", "pw");
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { email: "login@test.com" },
      });
      expect(mockBcrypt.compare).toHaveBeenCalledWith("pw", "hashedpw");
      expect(mockGenerateToken).toHaveBeenCalledWith(
        expect.objectContaining({ id: 2, email: "login@test.com" })
      );
      expect(result).toEqual({
        token: "logintoken",
        user: expect.objectContaining({
          id: 2,
          email: "login@test.com",
          firstName: "Alice",
          lastName: "Smith",
        }),
      });
      expect(result.user).not.toHaveProperty("passwordHash");
    });

    it("should throw error if user not found", async () => {
      mockPrismaUser.findUnique.mockResolvedValue(null);
      await expect(login("missing@test.com", "pw")).rejects.toThrow(
        "User not found"
      );
      expect(mockBcrypt.compare).not.toHaveBeenCalled();
    });

    it("should throw error if password is invalid", async () => {
      mockPrismaUser.findUnique.mockResolvedValue({
        id: 3,
        email: "wrongpw@test.com",
        passwordHash: "hashedpw",
      });
      mockBcrypt.compare.mockResolvedValue(false);
      await expect(login("wrongpw@test.com", "wrongpw")).rejects.toThrow(
        "Invalid password"
      );
      expect(mockGenerateToken).not.toHaveBeenCalled();
    });
  });
});
