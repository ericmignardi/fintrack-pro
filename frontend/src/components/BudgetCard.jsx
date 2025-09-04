import { useEffect, useState } from "react";
import { useCategory } from "../hooks/useCategory";

function BudgetCard({ budget }) {
  const { categories, findAllCategories } = useCategory();
  const [categoryName, setCategoryName] = useState("Uncategorized");

  useEffect(() => {
    findAllCategories();
  }, [findAllCategories]);

  useEffect(() => {
    if (categories && budget.categoryId) {
      const category = categories.find((cat) => cat.id === budget.categoryId);
      if (category) setCategoryName(category.name);
    }
  }, [categories, budget.categoryId]);

  return (
    <div>
      <div>
        {budget.categoryId} - {categoryName}
      </div>
      <div>{budget.name}</div>
      <div>{Number(budget.budgetAmount).toFixed(2)}</div>
      <div>{budget.period}</div>
      <div>{new Date(budget.startDate).toLocaleDateString()}</div>
      <div>{new Date(budget.endDate).toLocaleDateString()}</div>
      <div>{new Date(budget.createdAt).toLocaleString()}</div>
    </div>
  );
}

export default BudgetCard;
