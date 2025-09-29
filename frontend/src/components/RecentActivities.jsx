import { useState } from "react";

function RecentActivities({ transactions }) {
  const [filter, setFilter] = useState("ALL"); // ALL, INCOME, EXPENSE

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium mb-2">No recent activities</p>
        <p className="text-sm">Your recent transactions will appear here</p>
      </div>
    );
  }

  const formatCurrency = (amount, type) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return type === "INCOME" ? `+${formatted}` : `-${formatted}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const filteredTransactions = transactions
    .filter((tx) => filter === "ALL" || tx.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "ALL"
                ? "bg-primary-blue text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("INCOME")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "INCOME"
                ? "bg-success-green text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter("EXPENSE")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "EXPENSE"
                ? "bg-danger-red text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "INCOME"
                    ? "bg-success-green/10 text-success-green"
                    : "bg-danger-red/10 text-danger-red"
                }`}
              >
                {transaction.type === "INCOME" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {transaction.category?.name || "Uncategorized"} •{" "}
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <span
              className={`font-medium ${
                transaction.type === "INCOME"
                  ? "text-success-green"
                  : "text-danger-red"
              }`}
            >
              {formatCurrency(transaction.amount, transaction.type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivities;
