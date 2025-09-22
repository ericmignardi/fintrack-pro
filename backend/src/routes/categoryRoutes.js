import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createCategoryValidation } from "../validators/categoryValidator.js";
import {
  getAllCategories,
  createCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", authMiddleware, getAllCategories);

router.post(
  "/",
  authMiddleware,
  createCategoryValidation,
  validate,
  createCategory
);

export default router;
