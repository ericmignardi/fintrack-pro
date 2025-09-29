import prisma from "../config/database.js";

export const getAllCategories = async (userId) => {
  return await prisma.category.findMany({
    where: { userId },
    orderBy: {
      name: "asc",
    },
  });
};

export const createCategory = async (userId, categoryData) => {
  return await prisma.category.create({
    data: {
      userId,
      name: categoryData.name,
      type: categoryData.type,
      color: categoryData.color || "#3B82F6",
      icon: categoryData.icon || "dollar-sign",
    },
  });
};

export const createDefaultCategories = async (userId) => {
  const defaultCategories = [
    { name: "Salary", type: "INCOME", color: "#10B981", icon: "briefcase" },
    { name: "Freelance", type: "INCOME", color: "#8B5CF6", icon: "laptop" },
    {
      name: "Investment",
      type: "INCOME",
      color: "#F59E0B",
      icon: "trending-up",
    },
    {
      name: "Groceries",
      type: "EXPENSE",
      color: "#EF4444",
      icon: "shopping-cart",
    },
    { name: "Rent", type: "EXPENSE", color: "#3B82F6", icon: "home" },
    { name: "Transportation", type: "EXPENSE", color: "#6B7280", icon: "car" },
    { name: "Entertainment", type: "EXPENSE", color: "#EC4899", icon: "film" },
    { name: "Utilities", type: "EXPENSE", color: "#14B8A6", icon: "zap" },
  ];
  return await prisma.category.createMany({
    data: defaultCategories.map((cat) => ({
      userId,
      ...cat,
    })),
  });
};
