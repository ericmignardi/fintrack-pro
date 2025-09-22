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
  // Step 1: Verify transaction ownership
  const existing = await prisma.transaction.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    throw Object.assign(new Error("Transaction not found."), { code: "P2025" });
  }

  // Step 2: Validate category if provided
  if (
    transactionData.categoryId !== undefined &&
    transactionData.categoryId !== null
  ) {
    const category = await prisma.category.findUnique({
      where: { id: transactionData.categoryId },
    });

    if (!category || category.userId !== userId) {
      throw Object.assign(new Error("Invalid category."), {
        code: "CATEGORY_NOT_FOUND",
      });
    }
  }

  // Step 3: Update
  return await prisma.transaction.update({
    where: { id },
    data: transactionData,
    include: { category: true },
  });
};

export const deleteTransaction = async (id, userId) => {
  // Step 1: Verify ownership
  const existing = await prisma.transaction.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    throw Object.assign(new Error("Transaction not found."), { code: "P2025" });
  }

  // Step 2: Delete securely
  return await prisma.transaction.delete({
    where: { id },
    include: { category: true }, // optional, but useful if you want to return related info
  });
};

export const findTransactionsByCategory = async (userId, categoryId) => {
  return await prisma.transaction.findMany({
    where: { userId, categoryId },
    include: { category: true },
    orderBy: { transactionDate: "desc" },
  });
};

export const findTransactionById = async (userId, id) => {
  return await prisma.transaction.findFirst({
    where: { id, userId },
    include: { category: true },
  });
};
