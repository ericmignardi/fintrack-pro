import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

export const findAllTransactions = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user || !("id" in user)) {
    return res.status(401).json({ error: "User ID is required." });
  }
  try {
    const transactions = await transactionService.findAllTransactions(user.id);
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found." });
    }
    res.status(200).json({
      message: "Transactions retrieved successfully.",
      transactions,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve transactions." });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const user = req.user;
  const { categoryId, amount, description, transactionDate, type } = req.body;
  if (!user || !("id" in user)) {
    return res.status(401).json({ error: "User ID is required." });
  }
  try {
    const transaction = await transactionService.createTransaction(user.id, {
      categoryId,
      amount,
      description,
      transactionDate,
      type,
    });
    res.status(201).json({
      message: "Transaction created successfully.",
      transaction,
    });
  } catch {
    res.status(500).json({ error: "Failed to create transaction." });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const { categoryId, amount, description, transactionDate, type } = req.body;
  try {
    if (!user || !("id" in user)) {
      return res.status(401).json({ error: "User ID is required." });
    }
    const transaction = await transactionService.updateTransaction(
      user.id,
      Number(id),
      {
        categoryId,
        amount,
        description,
        transactionDate,
        type,
      }
    );
    res.status(200).json({
      message: "Transaction updated successfully.",
      transaction,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update transaction." });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  try {
    if (!user || !("id" in user)) {
      return res.status(401).json({ error: "User ID is required." });
    }
    await transactionService.deleteTransaction(user.id, Number(id));
    res.status(200).json({
      message: "Transaction deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete transaction." });
  }
};

export const findTransactionsByCategory = async (
  req: Request,
  res: Response
) => {
  const user = req.user;
  const { categoryId } = req.params;
  try {
    if (!user || !("id" in user)) {
      return res.status(401).json({ error: "User ID is required." });
    }
    const transactions = await transactionService.findTransactionsByCategory(
      user.id,
      Number(categoryId)
    );
    res.status(200).json({
      message: "Transactions retrieved successfully.",
      transactions,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve transactions." });
  }
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
