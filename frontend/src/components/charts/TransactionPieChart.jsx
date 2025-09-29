import { useTransaction } from "../../hooks/useTransaction";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

export default function TransactionPieChart() {
  const { transactions, isTransactionsLoading } = useTransaction();

  if (isTransactionsLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
        <p className="text-lg font-medium mb-2">No transaction data yet</p>
        <p className="text-sm">
          Add transactions to see your financial distribution
        </p>
      </div>
    );
  }

  const totals = transactions.reduce(
    (acc, tx) => {
      const amount = Number(tx.amount);
      if (tx.type === "INCOME") acc.income += amount;
      if (tx.type === "EXPENSE") acc.expense += amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = [
    { name: "Income", value: totals.income, color: "var(--success-green)" },
    { name: "Expense", value: totals.expense, color: "var(--danger-red)" },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p
            className={`text-lg font-bold ${
              payload[0].name === "Income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span className="text-gray-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
