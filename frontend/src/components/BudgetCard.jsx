function BudgetCard({ budget }) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-[var(--neutral-gray)]/50 rounded-2xl p-4">
      {/* Top row: budget name + amount */}
      <div className="flex justify-between items-start">
        <div className="text-lg font-semibold">
          {budget.name || "Untitled Budget"}
        </div>
        <div className="text-lg font-bold text-[var(--primary-blue)]">
          ${Number(budget.budgetAmount).toFixed(2)}
        </div>
      </div>

      {/* Middle row: category + period */}
      <div className="flex justify-between text-sm font-light text-[var(--neutral-gray)]">
        <span>{budget.category?.name || "Uncategorized"}</span>
        <span>{budget.period || "No period set"}</span>
      </div>

      {/* Bottom row: date range */}
      <div className="text-xs text-[var(--neutral-gray)]">
        {new Date(budget.startDate).toLocaleDateString()} –{" "}
        {new Date(budget.endDate).toLocaleDateString()}
      </div>
    </div>
  );
}

export default BudgetCard;
