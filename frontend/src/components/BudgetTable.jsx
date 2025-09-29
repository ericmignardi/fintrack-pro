import { Edit, Trash2 } from "lucide-react";

function BudgetTable({
  budgets,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
  isReading,
}) {
  if (isReading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!budgets || budgets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
        <p className="text-lg font-medium mb-2">No budgets yet</p>
        <p className="text-sm">
          Create your first budget to start tracking your expenses!
        </p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getProgressColor = (spent, total) => {
    const percentage = (spent / total) * 100;
    if (percentage >= 90) return "bg-red-600";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-600";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Period
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Progress
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dates
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgets.map((budget) => {
              const spentAmount =
                budget.transactions?.reduce(
                  (sum, tx) => sum + Number(tx.amount),
                  0
                ) || 0;
              const progressWidth = `${Math.min(
                (spentAmount / budget.budgetAmount) * 100,
                100
              )}%`;

              return (
                <tr
                  key={budget.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {budget.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {budget.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {budget.period}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(budget.budgetAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getProgressColor(
                          spentAmount,
                          budget.budgetAmount
                        )}`}
                        style={{ width: progressWidth }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {formatCurrency(spentAmount)} of{" "}
                      {formatCurrency(budget.budgetAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>From: {formatDate(budget.startDate)}</span>
                      <span>To: {formatDate(budget.endDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button
                      onClick={() => onEdit(budget)}
                      disabled={isUpdating}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                      aria-label="Edit budget"
                    >
                      <Edit
                        size={18}
                        className="hover:scale-110 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => onDelete(budget.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                      aria-label="Delete budget"
                    >
                      <Trash2
                        size={18}
                        className="hover:scale-110 transition-transform"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BudgetTable;
