import { useEffect, useState } from "react";
import { useTransaction } from "../../hooks/useTransaction";
import { useCategory } from "../../hooks/useCategory";

function TransactionForm() {
  const { createTransaction } = useTransaction();
  const { categories, findAllCategories } = useCategory();
  const [formData, setFormData] = useState({
    categoryId: "",
    amount: "",
    description: "",
    transactionDate: "",
    type: "",
  });

  useEffect(() => {
    findAllCategories();
  }, [findAllCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <label htmlFor="transactionDate">Transaction Date</label>
      <input
        type="date"
        id="transactionDate"
        name="transactionDate"
        value={formData.transactionDate}
        onChange={handleChange}
        required
      />

      <fieldset>
        <legend>Type</legend>
        <label>
          <input
            type="radio"
            name="type"
            value="INCOME"
            checked={formData.type === "INCOME"}
            onChange={handleChange}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="EXPENSE"
            checked={formData.type === "EXPENSE"}
            onChange={handleChange}
          />
          Expense
        </label>
      </fieldset>

      <label htmlFor="categoryId">Category</label>
      <select
        id="categoryId"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
      >
        <option value="">Select category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">Create Transaction</button>
    </form>
  );
}

export default TransactionForm;
