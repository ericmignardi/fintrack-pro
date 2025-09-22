import request from "supertest";
import app from "../../app.js";
import * as transactionService from "../../services/transactionService.js";
import { jest, describe, it, expect, beforeAll, afterAll } from "@jest/globals";

let token;

beforeAll(() => {
  token = "mocked-token";

  // Mock service layer
  jest
    .spyOn(transactionService, "findAllTransactions")
    .mockResolvedValue([{ id: 1, amount: 100, type: "INCOME" }]);

  jest
    .spyOn(transactionService, "createTransaction")
    .mockImplementation(async (userId, data) => ({ id: 2, userId, ...data }));

  jest
    .spyOn(transactionService, "updateTransaction")
    .mockImplementation(async (id, userId, data) => ({ id, userId, ...data }));

  jest.spyOn(transactionService, "deleteTransaction").mockResolvedValue(true);

  jest
    .spyOn(transactionService, "findTransactionsByCategory")
    .mockResolvedValue([{ id: 3, categoryId: 1, type: "EXPENSE" }]);

  jest
    .spyOn(transactionService, "findTransactionById")
    .mockImplementation(async (userId, id) =>
      id === 999 ? null : { id, userId, amount: 100, type: "INCOME" }
    );
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Transactions API - Integration Tests", () => {
  it("GET /api/transactions", async () => {
    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transactions.length).toBeGreaterThan(0);
  });

  it("POST /api/transactions success", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 50, type: "EXPENSE", transactionDate: "2025-01-02" });

    expect(res.statusCode).toBe(201);
    expect(res.body.transaction.amount).toBe(50);
  });

  it("POST /api/transactions 400 on missing fields", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 50 });

    expect(res.statusCode).toBe(400);
  });

  it("PUT /api/transactions/:id", async () => {
    const res = await request(app)
      .put("/api/transactions/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 200 });

    expect(res.statusCode).toBe(200);
    expect(res.body.transaction.amount).toBe(200);
  });

  it("DELETE /api/transactions/:id", async () => {
    const res = await request(app)
      .delete("/api/transactions/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/);
  });

  it("GET /api/transactions/category/:categoryId", async () => {
    const res = await request(app)
      .get("/api/transactions/category/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transactions[0]).toHaveProperty("categoryId", 1);
  });

  it("GET /api/transactions/:id success", async () => {
    const res = await request(app)
      .get("/api/transactions/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transaction.id).toBe(1);
  });

  it("GET /api/transactions/:id 404 not found", async () => {
    const res = await request(app)
      .get("/api/transactions/999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Transaction not found.");
  });
});
