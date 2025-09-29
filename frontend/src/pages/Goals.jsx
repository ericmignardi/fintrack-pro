import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import GoalsTable from "../components/GoalsTable";
import GoalForm from "../components/forms/GoalForm";
import GoalsProgressChart from "../components/charts/GoalsProgressChart";
import { useGoal } from "../hooks/useGoal";

function Goals() {
  const {
    goals,
    findAllGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    isGoalsLoading,
    isUpdatingGoal,
    isDeletingGoal,
  } = useGoal();

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    findAllGoals();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      let success;
      const toastMessage = editingGoal ? "Goal updated!" : "Goal created!";

      if (editingGoal) {
        success = await updateGoal(editingGoal.id, formData);
      } else {
        success = await createGoal(formData);
      }

      if (success) {
        toast.success(toastMessage);
        setShowForm(false);
        setEditingGoal(null);
        findAllGoals();
      }
    } catch (error) {
      console.error("Error handling form submit:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = async (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        const success = await deleteGoal(goalId);
        if (success) {
          toast.success("Goal deleted!");
          findAllGoals();
        }
      } catch (error) {
        console.error("Error deleting goal:", error);
        toast.error("Failed to delete goal. Please try again.");
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingGoal(null);
  };

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {/* Goals Progress Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Goals Progress
        </h2>
        <GoalsProgressChart goals={goals} />
      </div>

      {/* Goals List */}
      <GoalsTable
        goals={goals}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isReading={isGoalsLoading}
        isUpdating={isUpdatingGoal}
        isDeleting={isDeletingGoal}
      />

      {/* Goal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingGoal ? "Edit Goal" : "New Goal"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <GoalForm
              initialData={editingGoal}
              onSubmit={handleFormSubmit}
              mode={editingGoal ? "edit" : "create"}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Goals;
