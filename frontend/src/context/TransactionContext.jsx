import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [isUpdatingTransaction, setIsUpdatingTransaction] = useState(false);
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);

  const findAllTransactions = async () => {
    setIsTransactionsLoading(true);
    try {
      const response = await axiosInstance.get("/transactions");
      setTransactions(response.data.transactions || []);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions.");
      return false;
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const createTransaction = async (transaction) => {
    setIsCreatingTransaction(true);
    try {
      const response = await axiosInstance.post("/transactions", transaction);
      if (response.data.transaction) {
        setTransactions((prev) =>
          prev
            ? [...prev, response.data.transaction]
            : [response.data.transaction]
        );
        toast.success("Transaction created successfully!");
        return true;
      } else {
        toast.error("Failed to create transaction.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create transaction.");
      return false;
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  const findTransactionsByCategory = async (categoryId) => {
    setIsTransactionsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/transactions/category/${categoryId}`
      );
      setTransactions(response.data.transactions || []);
      toast.success("Transactions by category retrieved successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve transactions by category.");
      return false;
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const findTransactionById = async (transactionId) => {
    setIsTransactionsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/transactions/${transactionId}`
      );
      if (response.data.transaction) {
        setTransaction(response.data.transaction);
        toast.success("Transaction retrieved successfully!");
        return true;
      } else {
        toast.error("Failed to retrieve transaction.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve transaction by ID.");
      return false;
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const updateTransaction = async (transactionId, updatedData) => {
    setIsUpdatingTransaction(true);
    try {
      const response = await axiosInstance.put(
        `/transactions/${transactionId}`,
        updatedData
      );
      if (response.data.transaction) {
        setTransactions((prev) =>
          prev
            ? prev.map((t) =>
                t.id === response.data.transaction.id
                  ? response.data.transaction
                  : t
              )
            : [response.data.transaction]
        );
        setTransaction(response.data.transaction);
        toast.success("Transaction successfully updated!");
        return true;
      } else {
        toast.error("Failed to update transaction.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update transaction.");
      return false;
    } finally {
      setIsUpdatingTransaction(false);
    }
  };

  const deleteTransaction = async (transactionId) => {
    setIsDeletingTransaction(true);
    try {
      const response = await axiosInstance.delete(
        `/transactions/${transactionId}`
      );
      if (response.data.message === "Transaction deleted successfully.") {
        setTransactions((prev) =>
          prev ? prev.filter((t) => t.id !== transactionId) : []
        );
        setTransaction(null);
        toast.success("Transaction deleted successfully!");
        return true;
      } else {
        toast.error("Failed to delete transaction");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction.");
      return false;
    } finally {
      setIsDeletingTransaction(false);
    }
  };

  const value = {
    transactions,
    setTransactions,
    transaction,
    setTransaction,
    findAllTransactions,
    findTransactionsByCategory,
    findTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    isTransactionsLoading,
    setIsTransactionsLoading,
    isCreatingTransaction,
    setIsCreatingTransaction,
    isUpdatingTransaction,
    setIsUpdatingTransaction,
    isDeletingTransaction,
    setIsDeletingTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
