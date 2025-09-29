import { useEffect, useState } from "react";
import { useCategory } from "../../hooks/useCategory";

function BudgetForm({ initialData = null, onSubmit, mode = "create" }) {
  const { categories, findAllCategories, isCategoriesLoading } = useCategory();
  console.log("Categories in form:", categories); // Debug log
  console.log("Loading state:", isCategoriesLoading); // Debug log

  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    budgetAmount: "",
    period: "MONTHLY",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await findAllCategories();
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, [findAllCategories]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        categoryId: initialData.categoryId?.toString() || "",
        name: initialData.name || "",
        budgetAmount: initialData.budgetAmount?.toString() || "",
        period: initialData.period || "MONTHLY",
        startDate: initialData.startDate
          ? initialData.startDate.slice(0, 10)
          : "",
        endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : "",
      });
    } else {
      setFormData({
        categoryId: "",
        name: "",
        budgetAmount: "",
        period: "MONTHLY",
        startDate: "",
        endDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      categoryId: parseInt(formData.categoryId, 10),
      budgetAmount: parseFloat(formData.budgetAmount),
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Budget Name */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
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
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Monthly Groceries"
        />
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading categories...
            </option>
          )}
        </select>
      </div>

      {/* Budget Amount */}
      <div className="space-y-1">
        <label
          htmlFor="budgetAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Budget Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            id="budgetAmount"
            name="budgetAmount"
            value={formData.budgetAmount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-300 p-2 pl-7 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Period */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Period
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="period"
              value="WEEKLY"
              checked={formData.period === "WEEKLY"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Weekly</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="period"
              value="MONTHLY"
              checked={formData.period === "MONTHLY"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Monthly</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="period"
              value="YEARLY"
              checked={formData.period === "YEARLY"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Yearly</span>
          </label>
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
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
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
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
            min={formData.startDate}
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {mode === "edit" ? "Update Budget" : "Create Budget"}
      </button>
    </form>
  );
}

export default BudgetForm;
