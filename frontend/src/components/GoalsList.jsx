import { useEffect } from "react";
import GoalCard from "./GoalCard";
import { useGoal } from "../hooks/useGoal";

function GoalsList() {
  const { goals, findAllGoals, isGoalsLoading } = useGoal();

  useEffect(() => {
    findAllGoals();
  }, []);

  if (isGoalsLoading) return <div>Loading goals...</div>;
  if (!goals || goals.length === 0) return <div>No goals found.</div>;

  return (
    <div className="mt-2">
      <ul className="flex flex-col justify-center gap-2">
        {goals.map((goal) => (
          <li key={goal.id}>
            <GoalCard goal={goal} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalsList;
