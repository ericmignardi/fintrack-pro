import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export const getAllCategories = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user || !("id" in user)) {
    return res.status(401).json({ error: "User ID is required." });
  }

  try {
    const categories = await categoryService.getAllCategories(user.id);

    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve categories." });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const user = req.user;
  const { name, type, color, icon } = req.body;

  if (!user || !("id" in user)) {
    return res.status(401).json({ error: "User ID is required." });
  }

  if (!name || !type) {
    return res.status(400).json({ error: "Name and type are required." });
  }

  try {
    const category = await categoryService.createCategory(user.id, {
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
    res.status(500).json({ error: "Failed to create category." });
  }
};
