import { useState } from "react";
import { useGoal } from "../../hooks/useGoal";

function GoalForm() {
  const { createGoal } = useGoal();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createGoal({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
    });

    if (success) {
      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        currentAmount: "0",
        targetDate: "",
        status: "ACTIVE",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[var(--neutral-gray)]/50 rounded-2xl p-4 flex flex-col gap-4 w-full"
    >
      <h2 className="text-xl font-semibold text-[var(--dark-gray)]">
        Add Goal
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="title"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="targetAmount"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Target Amount
        </label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="currentAmount"
          className="text-sm font-medium text-[var(--neutral-gray)]"
        >
          Current Amount
        </label>
        <input
          type="number"
          id="currentAmount"
          name="currentAmount"
          value={formData.currentAmount}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="targetDate"
          className="text-sm font-medium text-[var(--neutral-gray)]"
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
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-[var(--neutral-gray)]">
          Status
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="ACTIVE"
              checked={formData.status === "ACTIVE"}
              onChange={handleChange}
              className="text-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
            />
            <span>Active</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="COMPLETED"
              checked={formData.status === "COMPLETED"}
              onChange={handleChange}
              className="text-[var(--success-green)] focus:ring-[var(--success-green)]"
            />
            <span>Completed</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="PAUSED"
              checked={formData.status === "PAUSED"}
              onChange={handleChange}
              className="text-[var(--danger-red)] focus:ring-[var(--danger-red)]"
            />
            <span>Paused</span>
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-2 font-medium py-2 px-4 rounded-lg text-white transition w-full bg-[var(--primary-blue)] hover:bg-[var(--secondary-blue)]"
      >
        Create Goal
      </button>
    </form>
  );
}

export default GoalForm;
