import prisma from "../config/database";
import { Transaction } from "@prisma/client";

export const findAllTransactions = async (userId: number) => {
  return await prisma.transaction.findMany({
    where: { userId },
    include: {
      category: true,
    },
    orderBy: {
      transactionDate: "desc",
    },
  });
};

export const createTransaction = async (
  userId: number,
  transactionData: Omit<
    Transaction,
    "id" | "userId" | "createdAt" | "updatedAt"
  >
) => {
  return await prisma.transaction.create({
    data: {
      ...transactionData,
      userId,
    },
    include: {
      category: true,
    },
  });
};

export const updateTransaction = async (
  userId: number,
  id: number,
  transactionData: Partial<
    Pick<
      Transaction,
      "categoryId" | "amount" | "description" | "transactionDate" | "type"
    >
  >
) => {
  return await prisma.transaction.update({
    where: { id, userId },
    data: {
      ...transactionData,
    },
    include: {
      category: true,
    },
  });
};

export const deleteTransaction = async (userId: number, id: number) => {
  return await prisma.transaction.delete({
    where: { id, userId },
  });
};

export const findTransactionsByCategory = async (
  userId: number,
  categoryId: number
) => {
  return await prisma.transaction.findMany({
    where: { userId, categoryId },
    include: {
      category: true,
    },
  });
};

// model Transaction {
//   id              Int             @id @default(autoincrement())
//   userId          Int             @map("user_id")
//   categoryId      Int?            @map("category_id")
//   amount          Decimal         @db.Decimal(10, 2)
//   description     String?
//   transactionDate DateTime        @map("transaction_date") @db.Date
//   type            TransactionType
//   createdAt       DateTime        @default(now()) @map("created_at")
//   updatedAt       DateTime        @updatedAt @map("updated_at")

//   // Relations
//   user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
//   category Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)

//   @@map("transactions")
// }
