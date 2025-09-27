import request from "supertest";
import { prisma } from "../../config/database.js";
import app from "../../app.js";

describe("User (Auth) Integration Tests", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/auth/register", () => {
    it("should register a user and set cookie", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "password123" });
      expect(res.status).toBe(201);
      expect(res.body.user.email).toBe("test@example.com");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/auth/register").send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should return 409 if email already exists", async () => {
      await prisma.user.create({
        data: { email: "dup@test.com", password: "password123" },
      });
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "dup@test.com", password: "password123" });
      expect(res.status).toBe(409);
      expect(res.body.error).toBe("Email already in use");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: { email: "login@test.com", password: "password123" },
      });
    });
    it("should login user and set cookie", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "login@test.com", password: "password123" });
      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe("login@test.com");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should return 400 if email or password is missing", async () => {
      const res = await request(app).post("/api/auth/login").send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should return 401 if invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "login@test.com", password: "wrongpw" });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should clear cookie and return 200", async () => {
      const res = await request(app).post("/api/auth/logout");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User logged out successfully");
    });
  });
});
