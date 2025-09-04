import { useEffect } from "react";
import GoalCard from "./GoalCard";
import { useGoal } from "../hooks/useGoal";

function GoalsList() {
  const { goals, findAll, isGoalsLoading } = useGoal();

  useEffect(() => {
    findAll();
  }, [findAll]);

  if (isGoalsLoading) return <div>Loading goals...</div>;
  if (!goals || goals.length === 0) return <div>No goals found.</div>;

  return (
    <div>
      <h2>Goals</h2>
      <ul>
        {goals?.map((goal) => (
          <li key={goal.id}>
            <GoalCard goal={goal} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalsList;
