import { Edit, Trash2 } from "lucide-react";

function GoalsTable({
  goals,
  onEdit,
  onDelete,
  isReading,
  isUpdating,
  isDeleting,
}) {
  if (isReading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
        <p className="text-lg font-medium mb-2">No goals yet</p>
        <p className="text-sm">Create your first goal to start tracking!</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return "bg-green-600";
    if (percentage >= 70) return "bg-blue-600";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-600";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "ACTIVE":
        return "bg-blue-100 text-blue-800";
      case "PAUSED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                Goal
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
                Target Date
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
            {goals.map((goal) => {
              const progressWidth = `${Math.min(
                (goal.currentAmount / goal.targetAmount) * 100,
                100
              )}%`;

              return (
                <tr
                  key={goal.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {goal.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {goal.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                        goal.status
                      )}`}
                    >
                      {goal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getProgressColor(
                          goal.currentAmount,
                          goal.targetAmount
                        )}`}
                        style={{ width: progressWidth }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {formatCurrency(goal.currentAmount)} of{" "}
                      {formatCurrency(goal.targetAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(goal.targetDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button
                      onClick={() => onEdit(goal)}
                      disabled={isUpdating}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                      aria-label="Edit goal"
                    >
                      <Edit
                        size={18}
                        className="hover:scale-110 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => onDelete(goal.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                      aria-label="Delete goal"
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

export default GoalsTable;
