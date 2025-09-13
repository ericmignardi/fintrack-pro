import { useEffect, useState } from "react";
import { useBudget } from "../../hooks/useBudget";
import { useCategory } from "../../hooks/useCategory";

function BudgetForm() {
  const { createBudget } = useBudget();
  const { categories, findAllCategories } = useCategory();

  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    budgetAmount: "",
    period: "MONTHLY",
    startDate: "",
    endDate: "",
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
    const success = await createBudget({
      ...formData,
      categoryId: parseInt(formData.categoryId, 10),
      budgetAmount: parseFloat(formData.budgetAmount),
    });

    if (success) {
      setFormData({
        categoryId: "",
        name: "",
        budgetAmount: "",
        period: "MONTHLY",
        startDate: "",
        endDate: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[var(--neutral-gray)]/50 rounded-2xl p-4 flex flex-col gap-4 w-full"
    >
      <h2 className="text-xl font-semibold text-[var(--dark-gray)]">
        Add Budget
      </h2>

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
          required
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

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Budget Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* Budget Amount */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="budgetAmount"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Budget Amount
        </label>
        <input
          type="number"
          step="0.01"
          id="budgetAmount"
          name="budgetAmount"
          value={formData.budgetAmount}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* Period */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-[var(--neutral-gray)]">
          Period
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="period"
              value="WEEKLY"
              checked={formData.period === "WEEKLY"}
              onChange={handleChange}
              className="text-[var(--danger-red)] focus:ring-[var(--danger-red)]"
            />
            <span>Weekly</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="period"
              value="MONTHLY"
              checked={formData.period === "MONTHLY"}
              onChange={handleChange}
              className="text-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
            />
            <span>Monthly</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="period"
              value="YEARLY"
              checked={formData.period === "YEARLY"}
              onChange={handleChange}
              className="text-[var(--success-green)] focus:ring-[var(--success-green)]"
            />
            <span>Yearly</span>
          </label>
        </div>
      </fieldset>

      {/* Start Date */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="startDate"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="endDate"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-2 font-medium py-2 px-4 rounded-lg text-white transition w-full bg-[var(--primary-blue)] hover:bg-[var(--secondary-blue)]"
      >
        Create Budget
      </button>
    </form>
  );
}

export default BudgetForm;
