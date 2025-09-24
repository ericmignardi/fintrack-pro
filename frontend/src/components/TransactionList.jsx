import { useEffect } from "react";
import { useTransaction } from "../hooks/useTransaction";
import { FiEdit, FiDelete } from "react-icons/fi";

function TransactionList() {
  const {
    transactions,
    findAllTransactions,
    isTransactionsLoading,
    updateTransaction,
    deleteTransaction,
    isUpdatingTransaction,
    isDeletingTransaction,
  } = useTransaction();

  useEffect(() => {
    findAllTransactions();
  }, []);

  if (isTransactionsLoading) return <div>Loading transactions...</div>;
  if (!transactions || transactions.length === 0)
    return <div>No transactions found.</div>;

  return (
    <div>
      <table className="w-full text-left">
        <thead className="bg-[var(--neutral-gray)]/50 border border-[var(--neutral-gray)]">
          <tr>
            <th className="px-2 py-1">Description</th>
            <th className="px-2 py-1">Type</th>
            <th className="px-2 py-1">Amount</th>
            <th className="px-2 py-1">Transaction Date</th>
            <th className="px-2 py-1">Edit</th>
            <th className="px-2 py-1">Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              className="border-b border-x border-[var(--neutral-gray)]"
              key={transaction.id}
            >
              <td className="px-2 py-1">{transaction.description}</td>
              <td className="px-2 py-1">{transaction.type}</td>
              <td className="px-2 py-1">{transaction.amount}</td>
              <td className="px-2 py-1">{transaction.transactionDate}</td>
              <td className="px-2 py-1">
                <FiEdit />
              </td>
              <td className="px-2 py-1">
                <FiDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
