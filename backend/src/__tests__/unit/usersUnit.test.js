import * as authService from "../../services/authService.js";
import prisma from "../../config/database.js";
import bcryptjs from "bcryptjs";
import * as categoryService from "../../services/categoryService.js";
import { generateToken } from "../../utils/token.js";
import { describe, it, expect, beforeAll, afterAll, jest } from "@jest/globals";

beforeAll(() => {
  // Mock Prisma
  jest.spyOn(prisma.user, "findUnique");
  jest.spyOn(prisma.user, "create");

  // Mock bcrypt
  jest.spyOn(bcryptjs, "hash");
  jest.spyOn(bcryptjs, "compare");

  // Mock token utility
  jest
    .spyOn({ generateToken }, "generateToken")
    .mockReturnValue("mocked-token");

  // Mock category creation
  jest.spyOn(categoryService, "createDefaultCategories").mockResolvedValue();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("authService.register", () => {
  it("throws an error if email already exists", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1 });
    await expect(
      authService.register("exists@example.com", "pass", "First", "Last")
    ).rejects.toThrow("Email already in use");
  });

  it("successfully registers a new user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 2,
      email: "new@example.com",
      firstName: "New",
      lastName: "User",
    });
    bcryptjs.hash.mockResolvedValue("hashed-password");

    const result = await authService.register(
      "new@example.com",
      "pass",
      "New",
      "User"
    );

    expect(prisma.user.create).toHaveBeenCalled();
    expect(categoryService.createDefaultCategories).toHaveBeenCalledWith(2);
    expect(generateToken).toHaveBeenCalled();
    expect(result.user.email).toBe("new@example.com");
    expect(result.token).toBe("mocked-token");
  });
});

describe("authService.login", () => {
  it("throws an error if user not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(
      authService.login("notfound@example.com", "pass")
    ).rejects.toThrow("User not found");
  });

  it("throws an error if password is invalid", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "test@example.com",
      passwordHash: "hashed-password",
    });
    bcryptjs.compare.mockResolvedValue(false);

    await expect(
      authService.login("test@example.com", "wrongpass")
    ).rejects.toThrow("Invalid password");
  });

  it("successfully logs in user", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      passwordHash: "hashed-password",
    });
    bcryptjs.compare.mockResolvedValue(true);

    const result = await authService.login("test@example.com", "correctpass");

    expect(result.user.email).toBe("test@example.com");
    expect(result.token).toBe("mocked-token");
    expect(generateToken).toHaveBeenCalled();
  });
});
