import prisma from "../config/database.js";

export const findAllGoals = async (userId) => {
  // Add userId parameter
  return await prisma.financialGoal.findMany({
    // Use correct model name
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const findById = async (userId, goalId) => {
  return await prisma.financialGoal.findFirst({
    // Use findFirst with compound where
    where: { id: goalId, userId }, // Fix field names
  });
};

export const createGoal = async (userId, goalData) => {
  return await prisma.financialGoal.create({
    // Correct model name
    data: {
      userId,
      ...goalData,
    },
  });
};

export const updateGoal = async (userId, goalId, goalData) => {
  return await prisma.financialGoal.update({
    where: { id: goalId, userId }, // Fix field names
    data: goalData,
  });
};

export const deleteGoal = async (userId, goalId) => {
  return await prisma.financialGoal.delete({
    where: { id: goalId, userId }, // Fix field names
  });
};
