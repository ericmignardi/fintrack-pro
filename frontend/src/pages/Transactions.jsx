import { useEffect, useState } from "react";
import { useTransaction } from "../hooks/useTransaction";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/forms/TransactionForm";
import TransactionPieChart from "../components/charts/TransactionPieChart";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

function Transactions() {
  const {
    transactions,
    findAllTransactions,
    isTransactionsLoading,
    createTransaction,
    updateTransaction,
    isUpdatingTransaction,
    deleteTransaction,
    isDeletingTransaction,
  } = useTransaction();

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    findAllTransactions();
  }, []);

  // Handle form submit for create or update
  const handleFormSubmit = async (formData) => {
    let success;
    const toastMessage = editingTransaction
      ? "Transaction updated!"
      : "Transaction created!";

    try {
      if (editingTransaction) {
        success = await updateTransaction(editingTransaction.id, formData);
      } else {
        success = await createTransaction(formData);
      }

      if (success) {
        toast.success(toastMessage);
        setShowForm(false);
        setEditingTransaction(null);
        findAllTransactions();
      }
    } catch (error) {
      console.error("Error handling form submit:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Handle edit button click from table
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  // Handle delete transaction
  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const success = await deleteTransaction(transactionId);
        if (success) {
          toast.success("Transaction deleted!");
          findAllTransactions();
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        toast.error("Failed to delete transaction. Please try again.");
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      {/* Transaction Overview Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Transaction Distribution
        </h2>
        <TransactionPieChart transactions={transactions} />
      </div>

      {/* Transaction List */}
      <TransactionTable
        transactions={transactions}
        isReading={isTransactionsLoading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        isUpdating={isUpdatingTransaction}
        isDeleting={isDeletingTransaction}
      />

      {/* Transaction Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingTransaction ? "Edit Transaction" : "New Transaction"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <TransactionForm
              initialData={editingTransaction}
              onSubmit={handleFormSubmit}
              mode={editingTransaction ? "edit" : "create"}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Transactions;
