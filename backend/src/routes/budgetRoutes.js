import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  createBudgetValidation,
  updateBudgetValidation,
  budgetIdParamValidation,
} from "../validators/budgetValidator.js";
import {
  findAllBudgets,
  findBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = Router();

router.get("/", authMiddleware, findAllBudgets);

router.get(
  "/:id",
  authMiddleware,
  budgetIdParamValidation,
  validate,
  findBudgetById
);

router.post(
  "/",
  authMiddleware,
  createBudgetValidation,
  validate,
  createBudget
);

router.put(
  "/:id",
  authMiddleware,
  updateBudgetValidation,
  validate,
  updateBudget
);

router.delete(
  "/:id",
  authMiddleware,
  budgetIdParamValidation,
  validate,
  deleteBudget
);

export default router;
