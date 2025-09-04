import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isGoalsLoading, setIsGoalsLoading] = useState(false);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [isUpdatingGoal, setIsUpdatingGoal] = useState(false);
  const [isDeletingGoal, setIsDeletingGoal] = useState(false);

  const findAll = async () => {
    setIsGoalsLoading(true);
    try {
      const response = await axiosInstance.get("/goals");
      setGoals(response.data.goals || []);
      toast.success("Goals retrieved successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve goals.");
      return false;
    } finally {
      setIsGoalsLoading(false);
    }
  };

  const findGoalById = async (goalId) => {
    setIsGoalsLoading(true);
    try {
      const response = await axiosInstance.get(`/goals/${goalId}`);
      if (response.data.goal) {
        setGoal(response.data.goal);
        toast.success("Goal retrieved successfully!");
        return true;
      } else {
        toast.error("Failed to retrieve goal by ID.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve goal by ID.");
      return false;
    } finally {
      setIsGoalsLoading(false);
    }
  };

  const createGoal = async (goalData) => {
    setIsCreatingGoal(true);
    try {
      const response = await axiosInstance.post("/goals", goalData);
      if (response.data.goal) {
        setGoals((prev) =>
          prev ? [...prev, response.data.goal] : [response.data.goal]
        );
        setGoal(response.data.goal);
        toast.success("Goal created successfully!");
        return true;
      } else {
        toast.error("Failed to create goal.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create goal.");
      return false;
    } finally {
      setIsCreatingGoal(false);
    }
  };

  const updateGoal = async (goalId, updatedGoal) => {
    setIsUpdatingGoal(true);
    try {
      const response = await axiosInstance.put(`/goals/${goalId}`, updatedGoal);
      if (response.data.goal) {
        setGoals((prev) =>
          prev
            ? prev.map((g) => (g.id === goalId ? response.data.goal : g))
            : [response.data.goal]
        );
        setGoal(response.data.goal);
        toast.success("Goal updated successfully!");
        return true;
      } else {
        toast.error("Failed to update goal.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update goal.");
      return false;
    } finally {
      setIsUpdatingGoal(false);
    }
  };

  const deleteGoal = async (goalId) => {
    setIsDeletingGoal(true);
    try {
      const response = await axiosInstance.delete(`/goals/${goalId}`);
      if (response.data.message === "Goal deleted successfully.") {
        setGoals((prev) => (prev ? prev.filter((g) => g.id !== goalId) : []));
        if (goal?.id === goalId) setGoal(null);
        toast.success("Goal deleted successfully!");
        return true;
      } else {
        toast.error("Failed to delete goal.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete goal.");
      return false;
    } finally {
      setIsDeletingGoal(false);
    }
  };

  const value = {
    goals,
    setGoals,
    goal,
    setGoal,
    isGoalsLoading,
    setIsGoalsLoading,
    isCreatingGoal,
    setIsCreatingGoal,
    isUpdatingGoal,
    setIsUpdatingGoal,
    isDeletingGoal,
    setIsDeletingGoal,
    findAll,
    findGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};
