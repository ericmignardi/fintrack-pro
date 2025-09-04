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
    period: "",
    startDate: "",
    endDate: "",
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
    const success = await createBudget({
      ...formData,
      budgetAmount: parseFloat(formData.budgetAmount),
    });

    if (success) {
      setFormData({
        categoryId: "",
        name: "",
        budgetAmount: "",
        period: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="budgetAmount">Budget Amount</label>
      <input
        type="number"
        id="budgetAmount"
        name="budgetAmount"
        value={formData.budgetAmount}
        onChange={handleChange}
        required
      />

      <fieldset>
        <legend>Period</legend>
        <label>
          <input
            type="radio"
            name="period"
            value="WEEKLY"
            checked={formData.period === "WEEKLY"}
            onChange={handleChange}
          />
          Weekly
        </label>
        <label>
          <input
            type="radio"
            name="period"
            value="MONTHLY"
            checked={formData.period === "MONTHLY"}
            onChange={handleChange}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            name="period"
            value="YEARLY"
            checked={formData.period === "YEARLY"}
            onChange={handleChange}
          />
          Yearly
        </label>
      </fieldset>

      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Budget</button>
    </form>
  );
}

export default BudgetForm;
