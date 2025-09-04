function TransactionCard({ transaction }) {
  return (
    <div>
      <div>{transaction.category?.name || "Uncategorized"}</div>
      <div>{transaction.description || "No description"}</div>
      <div>${Number(transaction.amount).toFixed(2)}</div>
      <div>{transaction.type}</div>
      <div>{new Date(transaction.transactionDate).toLocaleDateString()}</div>
    </div>
  );
}

export default TransactionCard;
