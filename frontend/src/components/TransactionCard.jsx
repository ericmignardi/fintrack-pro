function TransactionCard({ transaction }) {
  return (
    <div>
      {transaction.description}
      <br />
      {transaction.amount}
      <br />
      {transaction.transactionDate}
      <br />
      {transaction.category?.name}
      <br />
      {transaction.type}
    </div>
  );
}

export default TransactionCard;
