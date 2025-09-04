import { useEffect, useState } from "react";
import { useCategory } from "../hooks/useCategory";

function TransactionCard({ transaction }) {
  const { categories, findAllCategories } = useCategory();
  const [categoryName, setCategoryName] = useState("Uncategorized");

  useEffect(() => {
    findAllCategories();
  }, [findAllCategories]);

  useEffect(() => {
    if (categories && transaction.categoryId) {
      const category = categories.find(
        (cat) => cat.id === transaction.categoryId
      );
      if (category) setCategoryName(category.name);
    }
  }, [categories, transaction.categoryId]);

  return (
    <div>
      <div>
        {transaction.categoryId} - {categoryName}
      </div>
      <div>{transaction.description || "No description"}</div>
      <div>{Number(transaction.amount).toFixed(2)}</div>
      <div>{transaction.type}</div>
      <div>{new Date(transaction.transactionDate).toLocaleDateString()}</div>
      <div>{new Date(transaction.createdAt).toLocaleString()}</div>
      <div>{new Date(transaction.updatedAt).toLocaleString()}</div>
    </div>
  );
}

export default TransactionCard;
