import prisma from "../config/database";
import { Transaction, TransactionType } from "@prisma/client";

export const findAllTransactions = async (userId: number) => {
  return await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { transactionDate: "desc" },
  });
};

export const createTransaction = async (
  userId: number,
  transactionData: {
    categoryId?: number;
    amount: number;
    description?: string;
    transactionDate: Date;
    type: TransactionType;
  }
) => {
  return await prisma.transaction.create({
    data: {
      ...transactionData,
      userId,
    },
    include: { category: true },
  });
};

export const updateTransaction = async (
  id: number,
  userId: number,
  transactionData: {
    categoryId?: number;
    amount?: number;
    description?: string;
    transactionDate?: Date;
    type?: TransactionType;
  }
) => {
  return await prisma.transaction.update({
    where: {
      id,
      userId, // Security: ensures user owns the transaction
    },
    data: transactionData,
    include: { category: true },
  });
};

export const deleteTransaction = async (id: number, userId: number) => {
  return await prisma.transaction.delete({
    where: {
      id,
      userId, // Security: ensures user owns the transaction
    },
  });
};

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

export const findTransactionById = async (id: number, userId: number) => {
  return await prisma.transaction.findFirst({
    where: { id, userId },
    include: { category: true },
  });
};
