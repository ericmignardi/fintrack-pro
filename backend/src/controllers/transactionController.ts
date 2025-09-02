import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

// Helper to check user
const getUserId = (req: Request): number | null => {
  const user = req.user;
  if (!user || !("id" in user)) return null;
  return user.id;
};

export const findAllTransactions = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  try {
    const transactions = await transactionService.findAllTransactions(userId);

    res.status(200).json({
      message: "Transactions retrieved successfully.",
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve transactions." });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const { categoryId, amount, description, transactionDate, type } = req.body;

  if (!amount || !type || !transactionDate) {
    return res
      .status(400)
      .json({ error: "Amount, type, and transaction date are required." });
  }

  try {
    const transaction = await transactionService.createTransaction(userId, {
      categoryId,
      amount,
      description,
      transactionDate: new Date(transactionDate),
      type,
    });

    res.status(201).json({
      message: "Transaction created successfully.",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create transaction." });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const { id } = req.params;
  const { categoryId, amount, description, transactionDate, type } = req.body;

  try {
    const updated = await transactionService.updateTransaction(
      Number(id),
      userId,
      {
        categoryId,
        amount,
        description,
        transactionDate: transactionDate
          ? new Date(transactionDate)
          : undefined,
        type,
      }
    );

    res.status(200).json({
      message: "Transaction updated successfully.",
      transaction: updated,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Transaction not found." });
    }
    res.status(500).json({ error: "Failed to update transaction." });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const { id } = req.params;

  try {
    await transactionService.deleteTransaction(Number(id), userId);
    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Transaction not found." });
    }
    res.status(500).json({ error: "Failed to delete transaction." });
  }
};

export const findTransactionsByCategory = async (
  req: Request,
  res: Response
) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "User ID is required." });

  const { categoryId } = req.params;

  try {
    const transactions = await transactionService.findTransactionsByCategory(
      userId,
      Number(categoryId)
    );

    res.status(200).json({
      message: "Transactions retrieved successfully.",
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve transactions." });
  }
};
