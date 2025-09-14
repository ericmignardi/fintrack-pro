function GoalCard({ goal }) {
  const progressPercentage = (
    (goal.currentAmount / goal.targetAmount) *
    100
  ).toFixed(1);
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  return (
    <div className="flex flex-col gap-2 bg-white border border-[var(--neutral-gray)]/50 rounded-2xl p-4">
      <div className="flex justify-between items-start">
        <div className="text-lg font-semibold">
          {goal.title || "Untitled Goal"}
        </div>
        <div className="text-lg font-bold text-[var(--primary-blue)]">
          ${Number(goal.targetAmount).toFixed(2)}
        </div>
      </div>

      {goal.description && (
        <div className="text-sm text-[var(--dark-gray)]">
          {goal.description}
        </div>
      )}

      <div className="flex justify-between text-sm font-light text-[var(--neutral-gray)]">
        <span>Saved: ${Number(goal.currentAmount).toFixed(2)}</span>
        <span>Remaining: ${Number(remainingAmount).toFixed(2)}</span>
      </div>

      <div className="text-sm text-[var(--neutral-gray)]">
        Progress: {progressPercentage}%{" "}
        {isCompleted ? (
          <span className="text-[var(--success-green)] font-medium">
            (Completed!)
          </span>
        ) : null}
      </div>

      <div className="flex justify-between text-xs text-[var(--neutral-gray)]">
        <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
        <span>Status: {goal.status}</span>
      </div>
    </div>
  );
}

export default GoalCard;
