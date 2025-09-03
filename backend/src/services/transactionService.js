import prisma from "../config/database.js";

export const findAllTransactions = async (userId) => {
  return await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { transactionDate: "desc" },
  });
};

export const createTransaction = async (userId, transactionData) => {
  return await prisma.transaction.create({
    data: {
      ...transactionData,
      userId,
    },
    include: { category: true },
  });
};

export const updateTransaction = async (id, userId, transactionData) => {
  return await prisma.transaction.update({
    where: {
      id,
      userId, // Security: ensures user owns the transaction
    },
    data: transactionData,
    include: { category: true },
  });
};

export const deleteTransaction = async (id, userId) => {
  return await prisma.transaction.delete({
    where: {
      id,
      userId, // Security: ensures user owns the transaction
    },
  });
};

export const findTransactionsByCategory = async (userId, categoryId) => {
  return await prisma.transaction.findMany({
    where: { userId, categoryId },
    include: { category: true },
    orderBy: { transactionDate: "desc" },
  });
};

export const findTransactionById = async (id, userId) => {
  return await prisma.transaction.findFirst({
    where: { id, userId },
    include: { category: true },
  });
};
