import { useEffect } from "react";
import TransactionCard from "./TransactionCard";
import { useTransaction } from "../hooks/useTransaction";

function TransactionList() {
  const { transactions, findAllTransactions, isTransactionsLoading } =
    useTransaction();

  useEffect(() => {
    findAllTransactions();
  }, [findAllTransactions]);

  if (isTransactionsLoading) return <div>Loading transactions...</div>;
  if (!transactions || transactions.length === 0)
    return <div>No transactions found.</div>;

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions?.map((transaction) => (
          <li key={transaction.id}>
            <TransactionCard transaction={transaction} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
