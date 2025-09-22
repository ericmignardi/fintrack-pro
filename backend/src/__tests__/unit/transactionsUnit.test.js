import {
  findAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  findTransactionsByCategory,
  findTransactionById,
} from "../../controllers/transactionController.js";

import * as transactionService from "../../services/transactionService.js";
import { jest } from "@jest/globals";

// --- Helpers ---
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (userId, body = {}, params = {}) => ({
  user: userId ? { id: userId } : null,
  body,
  params,
});

// --- Tests ---
describe("Transaction Controller - Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAllTransactions", () => {
    it("401 if no user", async () => {
      const req = mockRequest(null);
      const res = mockResponse();

      await findAllTransactions(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("200 with transactions", async () => {
      jest
        .spyOn(transactionService, "findAllTransactions")
        .mockResolvedValue([{ id: 1 }]);

      const req = mockRequest(1);
      const res = mockResponse();

      await findAllTransactions(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ transactions: [{ id: 1 }] })
      );
    });
  });

  describe("createTransaction", () => {
    it("400 if missing required fields", async () => {
      const req = mockRequest(1, { amount: 100 });
      const res = mockResponse();

      await createTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("201 on success", async () => {
      jest
        .spyOn(transactionService, "createTransaction")
        .mockResolvedValue({ id: 1, amount: 100 });

      const req = mockRequest(1, {
        amount: 100,
        type: "INCOME",
        transactionDate: "2025-01-01",
      });
      const res = mockResponse();

      await createTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          transaction: expect.objectContaining({ id: 1 }),
        })
      );
    });
  });

  describe("updateTransaction", () => {
    it("200 on success", async () => {
      jest
        .spyOn(transactionService, "updateTransaction")
        .mockResolvedValue({ id: 1, amount: 200 });

      const req = mockRequest(1, { amount: 200 }, { id: "1" });
      const res = mockResponse();

      await updateTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("404 if not found", async () => {
      const error = new Error();
      error.code = "P2025";
      jest
        .spyOn(transactionService, "updateTransaction")
        .mockRejectedValue(error);

      const req = mockRequest(1, { amount: 200 }, { id: "1" });
      const res = mockResponse();

      await updateTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("deleteTransaction", () => {
    it("200 on success", async () => {
      jest
        .spyOn(transactionService, "deleteTransaction")
        .mockResolvedValue(true);

      const req = mockRequest(1, {}, { id: "1" });
      const res = mockResponse();

      await deleteTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("404 if not found", async () => {
      const error = new Error();
      error.code = "P2025";
      jest
        .spyOn(transactionService, "deleteTransaction")
        .mockRejectedValue(error);

      const req = mockRequest(1, {}, { id: "1" });
      const res = mockResponse();

      await deleteTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("findTransactionsByCategory", () => {
    it("200 with results", async () => {
      jest
        .spyOn(transactionService, "findTransactionsByCategory")
        .mockResolvedValue([{ id: 1, categoryId: 1 }]);

      const req = mockRequest(1, {}, { categoryId: "1" });
      const res = mockResponse();

      await findTransactionsByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("findTransactionById", () => {
    it("200 if found", async () => {
      jest
        .spyOn(transactionService, "findTransactionById")
        .mockResolvedValue({ id: 1 });

      const req = mockRequest(1, {}, { id: "1" });
      const res = mockResponse();

      await findTransactionById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("404 if not found", async () => {
      jest
        .spyOn(transactionService, "findTransactionById")
        .mockResolvedValue(null);

      const req = mockRequest(1, {}, { id: "999" });
      const res = mockResponse();

      await findTransactionById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
