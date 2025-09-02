import { Router } from "express";
import {
  findAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  findTransactionsByCategory,
} from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, findAllTransactions);
router.get("/category/:categoryId", authMiddleware, findTransactionsByCategory);
router.post("/", authMiddleware, createTransaction);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
