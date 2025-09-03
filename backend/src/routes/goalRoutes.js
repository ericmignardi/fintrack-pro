import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  findAllGoals,
  findById,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

const router = Router();

router.get("/", authMiddleware, findAllGoals);
router.get("/:id", authMiddleware, findById);
router.post("/", authMiddleware, createGoal);
router.put("/:id", authMiddleware, updateGoal);
router.delete("/:id", authMiddleware, deleteGoal);

export default router;
