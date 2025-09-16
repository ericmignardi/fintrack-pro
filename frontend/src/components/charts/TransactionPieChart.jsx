import { useTransaction } from "../../hooks/useTransaction";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

export default function TransactionPieChart() {
  const { transactions, isTransactionsLoading } = useTransaction();

  if (isTransactionsLoading) return <div>Loading transactions...</div>;
  if (!transactions || transactions.length === 0)
    return <div>No transaction data yet.</div>;

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
    { name: "Income", value: totals.income, colour: "#10b981" },
    { name: "Expense", value: totals.expense, colour: "#ef4444" },
  ];

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.colour} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
