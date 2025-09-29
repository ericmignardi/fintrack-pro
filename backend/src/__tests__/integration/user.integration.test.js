import request from "supertest";
import bcrypt from "bcryptjs";
import prisma from "../../config/database.js";
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
      const userData = {
        email: "test@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };
      const res = await request(app).post("/api/auth/register").send(userData);
      expect(res.status).toBe(201);
      expect(res.body.user).toEqual({
        id: expect.any(Number),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      expect(res.headers["set-cookie"]).toBeDefined();
      const user = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      expect(await bcrypt.compare("password123", user.passwordHash)).toBe(true);
    });

    it("should return 400 if required fields are missing", async () => {
      const testCases = [
        {},
        { email: "test@example.com" },
        { email: "test@example.com", password: "password123" },
        {
          email: "test@example.com",
          password: "password123",
          firstName: "John",
        },
        { password: "password123", firstName: "John", lastName: "Doe" },
      ];
      for (const testCase of testCases) {
        const res = await request(app)
          .post("/api/auth/register")
          .send(testCase);
        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      }
    });

    it("should return 409 if email already exists", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await prisma.user.create({
        data: {
          email: "dup@test.com",
          passwordHash: hashedPassword,
          firstName: "John",
          lastName: "Doe",
        },
      });
      const res = await request(app).post("/api/auth/register").send({
        email: "dup@test.com",
        password: "password123",
        firstName: "Jane",
        lastName: "Smith",
      });
      expect(res.status).toBe(409);
      expect(res.body.error).toBe("Email already in use");
    });

    it("should validate email format", async () => {
      const userData = {
        email: "invalid-email",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };
      const res = await request(app).post("/api/auth/register").send(userData);
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe("POST /api/auth/login", () => {
    const testUser = {
      email: "login@test.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    };
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const { password, ...userData } = testUser;
      await prisma.user.create({
        data: {
          ...userData,
          passwordHash: hashedPassword,
        },
      });
    });

    it("should login user and set cookie", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });
      expect(res.status).toBe(200);
      expect(res.body.user).toEqual({
        id: expect.any(Number),
        email: testUser.email,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
      });
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should return 400 if email or password is missing", async () => {
      const testCases = [
        {},
        { email: "login@test.com" },
        { password: "password123" },
      ];
      for (const testCase of testCases) {
        const res = await request(app).post("/api/auth/login").send(testCase);
        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      }
    });

    it("should return 401 if email doesn't exist", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nonexistent@test.com",
        password: "password123",
      });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password.");
    });

    it("should return 401 if password is incorrect", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password.");
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should clear cookie and return 200", async () => {
      const testUser = {
        email: "logout@test.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const { password, ...userData } = testUser;
      await prisma.user.create({
        data: {
          ...userData,
          passwordHash: hashedPassword,
        },
      });
      const loginRes = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });
      const cookie = loginRes.headers["set-cookie"];
      const res = await request(app)
        .post("/api/auth/logout")
        .set("Cookie", cookie);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User logged out successfully");
      expect(res.headers["set-cookie"][0]).toMatch(/token=;/);
    });

    it("should return 200 even if not logged in", async () => {
      const res = await request(app).post("/api/auth/logout");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User logged out successfully");
    });
  });
});
