function TransactionCard({ transaction }) {
  const isExpense = transaction.type === "EXPENSE";
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(transaction.transactionDate));

  return (
    <div className="flex flex-col gap-2 bg-white border border-[var(--neutral-gray)]/50 rounded-2xl p-4">
      <div className="flex justify-between items-start">
        <div className="text-lg font-semibold">
          {transaction.description || "No description"}
        </div>
        <div
          className={`text-lg font-bold ${
            isExpense
              ? "text-[var(--danger-red)]"
              : "text-[var(--success-green)]"
          }`}
        >
          ${Number(transaction.amount).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-between text-sm font-light text-[var(--neutral-gray)]">
        <span>{transaction.category?.name || "Uncategorized"}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default TransactionCard;
