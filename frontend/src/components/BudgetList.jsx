import { useEffect } from "react";
import BudgetCard from "./BudgetCard";
import { useBudget } from "../hooks/useBudget";

function BudgetList() {
  const { budgets, findAll, isBudgetsLoading } = useBudget();

  useEffect(() => {
    findAll();
  }, [findAll]);

  if (isBudgetsLoading) return <div>Loading budgets...</div>;
  if (!budgets || budgets.length === 0) return <div>No budgets found.</div>;

  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {budgets?.map((budget) => (
          <li key={budget.id}>
            <BudgetCard budget={budget} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetList;
