import { Edit, Trash2 } from "lucide-react";

function TransactionTable({
  transactions,
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

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
        <p className="text-lg font-medium mb-2">No transactions yet</p>
        <p className="text-sm">Add your first transaction to get started!</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
                Description
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
                Type
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
                Date
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
            {transactions.map((transaction) => {
              const isExpense = transaction.type === "EXPENSE";
              const formattedDate = new Date(
                transaction.transactionDate
              ).toLocaleDateString();
              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        isExpense
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium
                    ${isExpense ? "text-red-600" : "text-green-600"}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button
                      onClick={() => onEdit(transaction)}
                      disabled={isUpdating}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                      aria-label="Edit transaction"
                    >
                      <Edit
                        size={18}
                        className="hover:scale-110 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                      aria-label="Delete transaction"
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

export default TransactionTable;
