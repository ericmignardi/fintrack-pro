import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [budget, setBudget] = useState(null);
  const [isBudgetsLoading, setIsBudgetsLoading] = useState(false);
  const [isCreatingBudget, setIsCreatingBudget] = useState(false);
  const [isUpdatingBudget, setIsUpdatingBudget] = useState(false);
  const [isDeletingBudget, setIsDeletingBudget] = useState(false);

  const findAll = async () => {
    setIsBudgetsLoading(true);
    try {
      const response = await axiosInstance.get("/budgets");
      setBudgets(response.data.budgets || []);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsBudgetsLoading(false);
    }
  };

  const findBudgetById = async (budgetId) => {
    setIsBudgetsLoading(true);
    try {
      const response = await axiosInstance.get(`/budgets/${budgetId}`);
      if (response.data.budget) {
        setBudget(response.data.budget);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsBudgetsLoading(false);
    }
  };

  const createBudget = async (budgetData) => {
    setIsCreatingBudget(true);
    try {
      const response = await axiosInstance.post("/budgets", budgetData);
      if (response.data.budget) {
        setBudgets((prev) => [...prev, response.data.budget]);
        setBudget(response.data.budget);
        toast.success("Budget created successfully!");
        return true;
      }
      toast.error("Failed to create budget.");
      return false;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create budget.");
      return false;
    } finally {
      setIsCreatingBudget(false);
    }
  };

  const updateBudget = async (budgetId, updatedBudget) => {
    setIsUpdatingBudget(true);
    try {
      const response = await axiosInstance.put(
        `/budgets/${budgetId}`,
        updatedBudget
      );
      if (response.data.budget) {
        setBudgets((prev) =>
          prev.map((b) =>
            b.id === response.data.budget.id ? response.data.budget : b
          )
        );
        setBudget(response.data.budget);
        toast.success("Budget updated successfully!");
        return true;
      }
      toast.error("Failed to update budget.");
      return false;
    } catch (error) {
      console.error(error);
      toast.error("Failed to update budget.");
      return false;
    } finally {
      setIsUpdatingBudget(false);
    }
  };

  const deleteBudget = async (budgetId) => {
    setIsDeletingBudget(true);
    try {
      const response = await axiosInstance.delete(`/budgets/${budgetId}`);
      if (response.data.message === "Budget deleted successfully") {
        setBudgets((prev) => prev.filter((b) => b.id !== budgetId));
        if (budget?.id === budgetId) setBudget(null);
        toast.success("Budget deleted successfully!");
        return true;
      }
      toast.error("Failed to delete budget.");
      return false;
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete budget.");
      return false;
    } finally {
      setIsDeletingBudget(false);
    }
  };

  const value = {
    budgets,
    budget,
    isBudgetsLoading,
    isCreatingBudget,
    isUpdatingBudget,
    isDeletingBudget,
    findAll,
    findBudgetById,
    createBudget,
    updateBudget,
    deleteBudget,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
