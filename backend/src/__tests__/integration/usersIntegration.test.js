import request from "supertest";
import app from "../../app.js";
import * as authService from "../../services/authService.js";
import { describe, it, expect, beforeAll, afterAll, jest } from "@jest/globals";

let token;

beforeAll(() => {
  // Mock register
  jest
    .spyOn(authService, "register")
    .mockImplementation(async (email, password, firstName, lastName) => {
      if (email === "exists@example.com") {
        throw new Error("Email already in use");
      }
      return {
        token: "mocked-register-token",
        user: { id: 1, email, firstName, lastName },
      };
    });

  // Mock login
  jest
    .spyOn(authService, "login")
    .mockImplementation(async (email, password) => {
      if (email !== "test@example.com" || password !== "password123") {
        throw new Error("Invalid email or password");
      }
      return {
        token: "mocked-login-token",
        user: {
          id: 1,
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
        },
      };
    });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("User API - Authentication", () => {
  it("registers a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "new@example.com",
      password: "password123",
      firstName: "New",
      lastName: "User",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("new@example.com");
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("returns 409 if email already exists", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "exists@example.com",
      password: "password123",
      firstName: "Existing",
      lastName: "User",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("error", "Email already in use");
  });

  it("logs in successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = res.body.token;
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("returns 401 for invalid login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password.");
  });

  it("logs out successfully", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User logged out successfully");
  });
});
