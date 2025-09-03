import prisma from "../config/database.js";

export const findAllBudgets = async (userId) => {
  return await prisma.budget.findMany({
    where: { userId },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findBudgetById = async (userId, budgetId) => {
  const budget = await prisma.budget.findFirst({
    where: { userId, id: budgetId },
    include: {
      category: true,
    },
  });

  if (!budget) return null;

  // Calculate actual spending in this category for budget period
  const actualSpending = await prisma.transaction.aggregate({
    where: {
      userId,
      categoryId: budget.categoryId,
      transactionDate: {
        gte: budget.startDate,
        lte: budget.endDate,
      },
      type: "EXPENSE",
    },
    _sum: { amount: true },
  });

  return {
    ...budget,
    actualSpent: actualSpending._sum.amount || 0,
    remainingBudget: budget.budgetAmount - (actualSpending._sum.amount || 0),
  };
};

export const createBudget = async (userId, budgetData) => {
  return await prisma.budget.create({
    data: {
      userId,
      ...budgetData,
    },
  });
};

export const updateBudget = async (userId, budgetId, budgetData) => {
  return await prisma.budget.update({
    where: { id: budgetId, userId },
    data: budgetData,
  });
};

export const deleteBudget = async (userId, budgetId) => {
  return await prisma.budget.delete({
    where: { id: budgetId, userId },
  });
};

// Remove getBudgetWithSpending since it's now built into findBudgetById
