import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTransaction } from "../hooks/useTransaction";
import { formatDistanceToNow } from "date-fns";

function Dashboard() {
  const { transactions, isTransactionsLoading, findAllTransactions } =
    useTransaction();

  useEffect(() => {
    findAllTransactions();
  }, []);

  return (
    <div className="p-6">
      {/* Top Row */}
      <div className="flex justify-between items-center gap-6">
        {/* Left Side */}

        {/* Right Side */}
        <div className="rounded-2xl bg-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Your Recent Transactions</h1>
            <Link
              className="underline underline-offset-8 decoration-[var(--neutral-gray)]/50"
              to="/transactions"
            >
              See all transactions
            </Link>
          </div>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              {/* Image */}
              <div>
                <div>{transaction.category?.icon}</div>
              </div>
              {/* Description */}
              <div>
                <div>{transaction.description}</div>
                <div>{transaction.amount}</div>
              </div>
              {/* Category */}
              {/* <div>
                <div>{transaction.category?.name}</div>
              </div> */}
              {/* <div>
                {formatDistanceToNow(new Date(transaction.transactionDate), {
                  addSuffix: true,
                })}
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Botton Row */}
    </div>
  );
}

export default Dashboard;
