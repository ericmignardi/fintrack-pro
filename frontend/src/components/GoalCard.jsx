function GoalCard({ goal }) {
  return (
    <div>
      <div>{goal.title}</div>
      <div>{goal.description}</div>
      <div>{Number(goal.targetAmount).toFixed(2)}</div>
      <div>{Number(goal.currentAmount).toFixed(2)}</div>
      <div>{new Date(goal.targetDate).toLocaleDateString()}</div>
      <div>{goal.status}</div>
      <div>{new Date(goal.createdAt).toLocaleDateString()}</div>
      <div>{new Date(goal.updatedAt).toLocaleDateString()}</div>
    </div>
  );
}

export default GoalCard;
