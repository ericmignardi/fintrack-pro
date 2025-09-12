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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      categoryId: parseInt(formData.categoryId, 10), // <-- convert to number
    });

    if (success) {
      setFormData({
        categoryId: "",
        amount: "",
        description: "",
        transactionDate: "",
        type: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[var(--neutral-gray)]/50 rounded-2xl p-4 flex flex-col gap-4 w-full"
    >
      <h2 className="text-xl font-semibold text-[var(--dark-gray)]">
        Add Transaction
      </h2>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="amount"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* Transaction Date */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="transactionDate"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Transaction Date
        </label>
        <input
          type="date"
          id="transactionDate"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* Type */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-[var(--neutral-gray)]">
          Type
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="INCOME"
              checked={formData.type === "INCOME"}
              onChange={handleChange}
              className="text-[var(--success-green)] focus:ring-[var(--success-green)]"
            />
            <span>Income</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="EXPENSE"
              checked={formData.type === "EXPENSE"}
              onChange={handleChange}
              className="text-[var(--danger-red)] focus:ring-[var(--danger-red)]"
            />
            <span>Expense</span>
          </label>
        </div>
      </fieldset>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="categoryId"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        >
          <option value="">Select category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`mt-2 font-medium py-2 px-4 rounded-lg text-white transition w-full ${
          formData.type === "EXPENSE"
            ? "bg-[var(--danger-red)] hover:bg-red-600"
            : formData.type === "INCOME"
            ? "bg-[var(--success-green)] hover:bg-green-600"
            : "bg-[var(--primary-blue)] hover:bg-[var(--secondary-blue)]"
        }`}
      >
        Create Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
