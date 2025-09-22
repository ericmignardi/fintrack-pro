import request from "supertest";
import app from "../../app.js";
import * as goalService from "../../services/goalService.js";
import { describe, it, beforeAll, afterAll, expect, jest } from "@jest/globals";

let token = "mocked-token";

beforeAll(() => {
  jest
    .spyOn(goalService, "findAllGoals")
    .mockResolvedValue([
      { id: 1, title: "Buy a car", targetAmount: 10000, status: "ACTIVE" },
    ]);

  jest.spyOn(goalService, "findById").mockImplementation(async (userId, id) => {
    if (id === 999) return null;
    return { id, userId, title: "Car", targetAmount: 10000, status: "ACTIVE" };
  });

  jest
    .spyOn(goalService, "createGoal")
    .mockImplementation(async (userId, data) => ({
      id: 2,
      userId,
      ...data,
    }));

  jest
    .spyOn(goalService, "updateGoal")
    .mockImplementation(async (userId, id, data) => ({
      id,
      userId,
      ...data,
    }));

  jest.spyOn(goalService, "deleteGoal").mockResolvedValue({ id: 1 });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Goals API", () => {
  it("GET /api/goals returns goals", async () => {
    const res = await request(app)
      .get("/api/goals")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.goals.length).toBeGreaterThan(0);
  });

  it("GET /api/goals/:id returns a goal", async () => {
    const res = await request(app)
      .get("/api/goals/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.goal.id).toBe(1);
  });

  it("GET /api/goals/:id returns 404 if not found", async () => {
    const res = await request(app)
      .get("/api/goals/999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  it("POST /api/goals creates a goal", async () => {
    const res = await request(app)
      .post("/api/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Save for vacation",
        targetAmount: 3000,
        targetDate: "2025-12-31",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.goal.title).toBe("Save for vacation");
  });

  it("PUT /api/goals/:id updates a goal", async () => {
    const res = await request(app)
      .put("/api/goals/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Goal" });

    expect(res.statusCode).toBe(200);
    expect(res.body.goal.title).toBe("Updated Goal");
  });

  it("DELETE /api/goals/:id deletes a goal", async () => {
    const res = await request(app)
      .delete("/api/goals/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
