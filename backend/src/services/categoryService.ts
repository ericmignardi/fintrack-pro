import prisma from "../config/database";
import { TransactionType } from "@prisma/client";

export const getAllCategories = async (userId: number) => {
  return await prisma.category.findMany({
    where: { userId },
    orderBy: {
      name: "asc",
    },
  });
};

export const createCategory = async (
  userId: number,
  categoryData: {
    name: string;
    type: TransactionType;
    color?: string;
    icon?: string;
  }
) => {
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

// Optional: Create default categories for new users
export const createDefaultCategories = async (userId: number) => {
  const defaultCategories = [
    // Income categories
    {
      name: "Salary",
      type: "INCOME" as TransactionType,
      color: "#10B981",
      icon: "briefcase",
    },
    {
      name: "Freelance",
      type: "INCOME" as TransactionType,
      color: "#8B5CF6",
      icon: "laptop",
    },
    {
      name: "Investment",
      type: "INCOME" as TransactionType,
      color: "#F59E0B",
      icon: "trending-up",
    },

    // Expense categories
    {
      name: "Groceries",
      type: "EXPENSE" as TransactionType,
      color: "#EF4444",
      icon: "shopping-cart",
    },
    {
      name: "Rent",
      type: "EXPENSE" as TransactionType,
      color: "#3B82F6",
      icon: "home",
    },
    {
      name: "Transportation",
      type: "EXPENSE" as TransactionType,
      color: "#6B7280",
      icon: "car",
    },
    {
      name: "Entertainment",
      type: "EXPENSE" as TransactionType,
      color: "#EC4899",
      icon: "film",
    },
    {
      name: "Utilities",
      type: "EXPENSE" as TransactionType,
      color: "#14B8A6",
      icon: "zap",
    },
  ];

  return await prisma.category.createMany({
    data: defaultCategories.map((cat) => ({
      userId,
      ...cat,
    })),
  });
};
