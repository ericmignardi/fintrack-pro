import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BudgetBarChart({ budgets }) {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium mb-2">No budget data yet</p>
        <p className="text-sm">Add budgets to see your spending analysis</p>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const data = budgets.map((budget) => {
    const spent =
      budget.transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0;
    return {
      name: budget.name,
      budget: Number(budget.budgetAmount),
      spent: spent,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="text-sm font-medium mb-2">{label}</p>
          <p className="text-sm" style={{ color: "var(--primary-blue)" }}>
            Budget: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm" style={{ color: "var(--success-green)" }}>
            Spent: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[1].value > payload[0].value
              ? "Over budget!"
              : "Under budget"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tickFormatter={formatCurrency}
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="budget" fill="var(--primary-blue)" name="Budget" />
          <Bar dataKey="spent" fill="var(--success-green)" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetBarChart;
