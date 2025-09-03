import TransactionForm from "../components/forms/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  return (
    <div>
      <TransactionList />
      <TransactionForm />
    </div>
  );
}

export default Dashboard;
