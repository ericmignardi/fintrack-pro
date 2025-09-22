import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  createGoalValidation,
  updateGoalValidation,
  goalIdParamValidation,
} from "../validators/goalValidator.js";
import {
  findAllGoals,
  findById,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

const router = Router();

router.get("/", authMiddleware, findAllGoals);

router.get("/:id", authMiddleware, goalIdParamValidation, validate, findById);

router.post("/", authMiddleware, createGoalValidation, validate, createGoal);

router.put("/:id", authMiddleware, updateGoalValidation, validate, updateGoal);

router.delete(
  "/:id",
  authMiddleware,
  goalIdParamValidation,
  validate,
  deleteGoal
);

export default router;
