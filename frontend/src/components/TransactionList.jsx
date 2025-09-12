import { useEffect } from "react";
import TransactionCard from "./TransactionCard";
import { useTransaction } from "../hooks/useTransaction";

function TransactionList() {
  const { transactions, findAllTransactions, isTransactionsLoading } =
    useTransaction();

  useEffect(() => {
    findAllTransactions();
  }, []);

  if (isTransactionsLoading) return <div>Loading transactions...</div>;
  if (!transactions || transactions.length === 0)
    return <div>No transactions found.</div>;

  return (
    <div className="mt-2">
      <ul className="flex flex-col justify-center gap-2">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <TransactionCard transaction={transaction} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
