import TransactionForm from "../components/forms/TransactionForm";
import TransactionList from "../components/TransactionList";

function Transactions() {
  return (
    <div>
      <TransactionForm />
      <TransactionList />
    </div>
  );
}

export default Transactions;
