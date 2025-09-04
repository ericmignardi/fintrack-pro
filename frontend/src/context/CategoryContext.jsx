import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Fetch all categories
  const findAllCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.categories || []);
      toast.success("Categories retrieved successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories.");
      return false;
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  // Create category
  const createCategory = async (category) => {
    setIsCreatingCategory(true);
    try {
      const response = await axiosInstance.post("/categories", category);
      if (response.data.category) {
        setCategories((prev) =>
          prev ? [...prev, response.data.category] : [response.data.category]
        );
        setCategory(response.data.category);
        toast.success("Category created successfully!");
        return true;
      } else {
        toast.error("Failed to create category.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category.");
      return false;
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const value = {
    categories,
    setCategories,
    category,
    setCategory,
    findAllCategories,
    createCategory,
    isCategoriesLoading,
    setIsCategoriesLoading,
    isCreatingCategory,
    setIsCreatingCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
