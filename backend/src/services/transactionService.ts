import prisma from "../config/database";
import { Transaction } from "@prisma/client";

// Fetch all transactions for a user
export const findAllTransactions = async (userId: number) => {
  return await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { transactionDate: "desc" },
  });
};

// Create a new transaction
export const createTransaction = async (
  userId: number,
  transactionData: Omit<
    Transaction,
    "id" | "userId" | "createdAt" | "updatedAt"
  >
) => {
  return await prisma.transaction.create({
    data: { ...transactionData, userId },
    include: { category: true },
  });
};

// Update a transaction (verify ownership in controller)
export const updateTransaction = async (
  id: number,
  transactionData: Partial<
    Pick<
      Transaction,
      "categoryId" | "amount" | "description" | "transactionDate" | "type"
    >
  >
) => {
  return await prisma.transaction.update({
    where: { id },
    data: transactionData,
    include: { category: true },
  });
};

// Delete a transaction (verify ownership in controller)
export const deleteTransaction = async (id: number) => {
  return await prisma.transaction.delete({
    where: { id },
  });
};

// Find transactions by category
export const findTransactionsByCategory = async (
  userId: number,
  categoryId: number
) => {
  return await prisma.transaction.findMany({
    where: { userId, categoryId },
    include: { category: true },
    orderBy: { transactionDate: "desc" },
  });
};
