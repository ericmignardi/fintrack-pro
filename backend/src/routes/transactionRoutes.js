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
import { validate } from "../middleware/validate.js";
import {
  createTransactionValidation,
  updateTransactionValidation,
  transactionIdParamValidation,
  categoryIdParamValidation,
} from "../validators/transactionValidator.js";

const router = Router();

router.get("/", authMiddleware, findAllTransactions);

router.get(
  "/category/:categoryId",
  authMiddleware,
  categoryIdParamValidation,
  validate,
  findTransactionsByCategory
);

router.get(
  "/:id",
  authMiddleware,
  transactionIdParamValidation,
  validate,
  findTransactionById
);

router.post(
  "/",
  authMiddleware,
  createTransactionValidation,
  validate,
  createTransaction
);

router.put(
  "/:id",
  authMiddleware,
  updateTransactionValidation,
  validate,
  updateTransaction
);

router.delete(
  "/:id",
  authMiddleware,
  transactionIdParamValidation,
  validate,
  deleteTransaction
);

export default router;
