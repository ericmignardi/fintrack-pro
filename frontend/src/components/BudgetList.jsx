import { useEffect } from "react";
import BudgetCard from "./BudgetCard";
import { useBudget } from "../hooks/useBudget";

function BudgetList() {
  const { budgets, findAll, isBudgetsLoading } = useBudget();

  useEffect(() => {
    findAll();
  }, []);

  if (isBudgetsLoading) return <div>Loading budgets...</div>;
  if (!budgets || budgets.length === 0) return <div>No budgets found.</div>;

  return (
    <div className="mt-2">
      <ul className="flex flex-col justify-center gap-2">
        {budgets.map((budget) => (
          <li key={budget.id}>
            <BudgetCard budget={budget} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetList;
