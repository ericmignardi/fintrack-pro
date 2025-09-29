import { useEffect, useState } from "react";
import { useGoal } from "../../hooks/useGoal";

function GoalForm({ initialData = null, onSubmit, mode = "create" }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    currentAmount: "0",
    targetDate: "",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        targetAmount: initialData.targetAmount?.toString() || "",
        currentAmount: initialData.currentAmount?.toString() || "0",
        targetDate: initialData.targetDate
          ? initialData.targetDate.slice(0, 10)
          : "",
        status: initialData.status || "ACTIVE",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        currentAmount: "0",
        targetDate: "",
        status: "ACTIVE",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Goal Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Buy a House"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your goal..."
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="targetAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Target Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-300 p-2 pl-7 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="currentAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Current Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            id="currentAmount"
            name="currentAmount"
            value={formData.currentAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-300 p-2 pl-7 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="targetDate"
          className="block text-sm font-medium text-gray-700"
        >
          Target Date
        </label>
        <input
          type="date"
          id="targetDate"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="ACTIVE"
              checked={formData.status === "ACTIVE"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="COMPLETED"
              checked={formData.status === "COMPLETED"}
              onChange={handleChange}
              className="text-green-600 focus:ring-green-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Completed</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="PAUSED"
              checked={formData.status === "PAUSED"}
              onChange={handleChange}
              className="text-yellow-600 focus:ring-yellow-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Paused</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {mode === "edit" ? "Update Goal" : "Create Goal"}
      </button>
    </form>
  );
}

export default GoalForm;
