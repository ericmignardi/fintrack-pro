import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const findAllCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.categories || []);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories.");
      return false;
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setIsCreatingCategory(true);
    try {
      const response = await axiosInstance.post("/categories", categoryData);
      if (response.data.category) {
        setCategories((prev) => [...prev, response.data.category]);
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
    category,
    findAllCategories,
    createCategory,
    isCategoriesLoading,
    isCreatingCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
