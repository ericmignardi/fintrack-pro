function BudgetCard({ budget }) {
  return (
    <div>
      <div>{budget.category?.name || "Uncategorized"}</div>
      <div>{budget.name}</div>
      <div>{Number(budget.budgetAmount).toFixed(2)}</div>
      <div>{budget.period}</div>
      <div>{new Date(budget.startDate).toLocaleDateString()}</div>
      <div>{new Date(budget.endDate).toLocaleDateString()}</div>
      <div>{new Date(budget.createdAt).toLocaleString()}</div>
    </div>
  );
}

export default BudgetCard;
