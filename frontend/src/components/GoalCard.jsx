function GoalCard({ goal }) {
  const progressPercentage = (
    (goal.currentAmount / goal.targetAmount) *
    100
  ).toFixed(1);
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  return (
    <div>
      <div>
        <strong>{goal.title}</strong>
      </div>
      <div>{goal.description}</div>
      <div>Target: ${Number(goal.targetAmount).toFixed(2)}</div>
      <div>Current: ${Number(goal.currentAmount).toFixed(2)}</div>
      <div>Remaining: ${Number(remainingAmount).toFixed(2)}</div>
      <div>
        Progress: {progressPercentage}% {isCompleted ? "(Completed!)" : ""}
      </div>
      <div>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</div>
      <div>Status: {goal.status}</div>
    </div>
  );
}

export default GoalCard;
