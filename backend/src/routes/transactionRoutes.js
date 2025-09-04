import { Router } from "express";
import {
  findAllTransactions,
  findTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  findTransactionsByCategory,
} from "../controllers/transactionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, findAllTransactions);
router.get("/category/:categoryId", authMiddleware, findTransactionsByCategory);
router.get("/:id", authMiddleware, findTransactionById);
router.post("/", authMiddleware, createTransaction);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
