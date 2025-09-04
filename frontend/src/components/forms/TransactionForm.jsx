import { useEffect } from "react";
import { useTransaction } from "../../hooks/useTransaction";
import { useCategory } from "../../hooks/useCategory";

function TransactionForm() {
  const { createTransaction } = useTransaction();
  const { categories, findAllCategories } = useCategory();

  useEffect(() => {
    findAllCategories();
  }, [findAllCategories]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTransaction = {
      description: formData.get("description"),
      amount: Number(formData.get("amount")),
      transactionDate: formData.get("transactionDate"),
      categoryId: Number(formData.get("category")),
      type: formData.get("type"),
    };
    createTransaction(newTransaction);
    event.currentTarget.reset(); // clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" placeholder="Description" required />
      <input name="amount" type="number" placeholder="Amount" required />
      <input name="transactionDate" type="date" required />
      <select name="category">
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select name="type">
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
