import * as categoryService from "../services/categoryService.js";

const getUserId = (req) => {
  const user = req.user;
  if (!user || !("id" in user)) return null;
  return user.id;
};

export const getAllCategories = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  try {
    const categories = await categoryService.getAllCategories(userId);
    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve categories." });
  }
};

export const createCategory = async (req, res) => {
  const userId = getUserId(req);
  const { name, type, color, icon } = req.body;

  if (!userId) return res.status(401).json({ error: "User ID is required." });

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category." });
  }
};
