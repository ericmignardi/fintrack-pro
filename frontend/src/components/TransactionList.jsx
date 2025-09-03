import TransactionCard from "./TransactionCard";
import { useTransaction } from "../hooks/useTransaction";
import { useEffect } from "react";

function TransactionList() {
  const { transactions, findAllTransactions } = useTransaction();

  useEffect(() => {
    findAllTransactions();
  }, []);

  return (
    <div>
      {transactions?.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
