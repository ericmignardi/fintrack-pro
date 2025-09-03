import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const findAllTransactions = async () => {
    setIsTransactionsLoading(true);
    try {
      const response = await axiosInstance.get("/transactions");
      if (response.data.transactions) {
        setTransactions(response.data.transactions);
        return true;
      } else {
        setTransactions([]);
        return true;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions.");
      return false;
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const createTransaction = async (transaction) => {
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
    }
  };

  const findAllCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const response = await axiosInstance.get("/categories");
      if (response.data.categories) {
        setCategories(response.data.categories);
        return true;
      } else {
        toast.error("No categories found.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories.");
      return false;
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const value = {
    transactions,
    setTransactions,
    categories,
    setCategories,
    findAllTransactions,
    isTransactionsLoading,
    findAllCategories,
    isCategoriesLoading,
    createTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
