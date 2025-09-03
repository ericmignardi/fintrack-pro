import TransactionCard from "./TransactionCard";
import { useTransaction } from "../hooks/useTransaction";
import { useEffect } from "react";

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
    <div>
      <h2>Your Transactions</h2>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
