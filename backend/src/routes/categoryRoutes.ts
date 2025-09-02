import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllCategories,
  createCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", authMiddleware, getAllCategories);
router.post("/", authMiddleware, createCategory);

export default router;
