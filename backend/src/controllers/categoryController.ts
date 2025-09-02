import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

// Helper to check user (consistent with transaction controller)
const getUserId = (req: Request): number | null => {
  const user = req.user;
  if (!user || !("id" in user)) return null;
  return user.id;
};

export const getAllCategories = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  try {
    const categories = await categoryService.getAllCategories(userId);
    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve categories." });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { name, type, color, icon } = req.body;

  if (!userId) return res.status(401).json({ error: "User ID is required." });

  if (!name || !type) {
    return res.status(400).json({ error: "Name and type are required." });
  }

  try {
    const category = await categoryService.createCategory(userId, {
      name,
      type,
      color,
      icon,
    });

    res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category." });
  }
};
