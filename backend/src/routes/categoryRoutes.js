import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllCategories,
  createCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", authMiddleware, getAllCategories);
router.post("/", authMiddleware, createCategory);

export default router;
