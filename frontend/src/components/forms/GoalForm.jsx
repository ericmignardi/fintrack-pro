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
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <label htmlFor="targetAmount">Target Amount</label>
      <input
        type="number"
        id="targetAmount"
        name="targetAmount"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />

      <label htmlFor="currentAmount">Current Amount</label>
      <input
        type="number"
        id="currentAmount"
        name="currentAmount"
        value={formData.currentAmount}
        onChange={handleChange}
      />

      <label htmlFor="targetDate">Target Date</label>
      <input
        type="date"
        id="targetDate"
        name="targetDate"
        value={formData.targetDate}
        onChange={handleChange}
        required
      />

      <fieldset>
        <legend>Status</legend>
        <label>
          <input
            type="radio"
            name="status"
            value="ACTIVE"
            checked={formData.status === "ACTIVE"}
            onChange={handleChange}
          />
          Active
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="COMPLETED"
            checked={formData.status === "COMPLETED"}
            onChange={handleChange}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="PAUSED"
            checked={formData.status === "PAUSED"}
            onChange={handleChange}
          />
          Paused
        </label>
      </fieldset>

      <button type="submit">Create Goal</button>
    </form>
  );
}

export default GoalForm;
