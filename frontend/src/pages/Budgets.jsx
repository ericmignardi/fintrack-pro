import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import BudgetTable from "../components/BudgetTable";
import BudgetForm from "../components/forms/BudgetForm";
import BudgetBarChart from "../components/charts/BudgetBarChart";
import { useBudget } from "../hooks/useBudget";

function Budgets() {
  const {
    budgets,
    findAll,
    createBudget,
    updateBudget,
    deleteBudget,
    isBudgetsLoading,
    isUpdatingBudget,
    isDeletingBudget,
  } = useBudget();

  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    findAll();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      let success;
      const toastMessage = editingBudget
        ? "Budget updated!"
        : "Budget created!";

      if (editingBudget) {
        success = await updateBudget(editingBudget.id, formData);
      } else {
        success = await createBudget(formData);
      }

      if (success) {
        toast.success(toastMessage);
        setShowForm(false);
        setEditingBudget(null);
        findAll();
      }
    } catch (error) {
      console.error("Error handling form submit:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleDelete = async (budgetId) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        const success = await deleteBudget(budgetId);
        if (success) {
          toast.success("Budget deleted!");
          findAll();
        }
      } catch (error) {
        console.error("Error deleting budget:", error);
        toast.error("Failed to delete budget. Please try again.");
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Budget
        </button>
      </div>

      {/* Budget Overview Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Budget Overview
        </h2>
        <BudgetBarChart budgets={budgets} />
      </div>

      {/* Budget List */}
      <BudgetTable
        budgets={budgets}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isReading={isBudgetsLoading}
        isUpdating={isUpdatingBudget}
        isDeleting={isDeletingBudget}
      />

      {/* Budget Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingBudget ? "Edit Budget" : "New Budget"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <BudgetForm
              initialData={editingBudget}
              onSubmit={handleFormSubmit}
              mode={editingBudget ? "edit" : "create"}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Budgets;
