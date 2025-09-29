import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function GoalsProgressChart({ goals }) {
  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium mb-2">No goals data yet</p>
        <p className="text-sm">Add goals to see your progress</p>
      </div>
    );
  }

  const data = goals.map((goal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    return {
      name: goal.title,
      progress: Math.min(progress, 100),
      fill: getColorByProgress(progress),
    };
  });

  function getColorByProgress(progress) {
    if (progress >= 100) return "var(--success-green)"; // Completed
    if (progress >= 75) return "var(--primary-blue)"; // Near completion
    if (progress >= 50) return "var(--warning-yellow)"; // Halfway
    if (progress >= 25) return "var(--secondary-blue)"; // Started
    return "var(--danger-red)"; // Early stages
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="text-sm font-medium">{payload[0].payload.name}</p>
          <p className="text-sm" style={{ color: "var(--primary-blue)" }}>
            Progress: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <ul className="flex flex-wrap justify-center gap-4 text-sm">
        {payload.map((entry, index) => (
          <li key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700">
              {entry.value} ({entry.payload.progress.toFixed(1)}%)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="30%"
          outerRadius="80%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            label={{ fill: "#666", position: "insideStart" }}
            background
            dataKey="progress"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            verticalAlign="bottom"
            height={36}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GoalsProgressChart;
