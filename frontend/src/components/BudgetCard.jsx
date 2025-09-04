function BudgetCard({ budget }) {
  const actualSpent = budget.actualSpent || 0;
  const remainingBudget = budget.remainingBudget || budget.budgetAmount;
  const progressPercentage = (
    (actualSpent / budget.budgetAmount) *
    100
  ).toFixed(1);
  const isOverBudget = actualSpent > budget.budgetAmount;

  return (
    <div>
      <div>
        <strong>{budget.name}</strong>
      </div>
      <div>Category: {budget.category?.name || "Uncategorized"}</div>
      <div>Budget: ${Number(budget.budgetAmount).toFixed(2)}</div>
      <div>Spent: ${Number(actualSpent).toFixed(2)}</div>
      <div>Remaining: ${Number(remainingBudget).toFixed(2)}</div>
      <div>
        Progress: {progressPercentage}% {isOverBudget ? "(Over Budget!)" : ""}
      </div>
      <div>Period: {budget.period}</div>
      <div>
        {new Date(budget.startDate).toLocaleDateString()} -{" "}
        {new Date(budget.endDate).toLocaleDateString()}
      </div>
    </div>
  );
}

export default BudgetCard;
