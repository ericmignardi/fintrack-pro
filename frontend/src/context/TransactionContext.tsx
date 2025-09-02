import { createContext, useState, type ReactNode } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

interface TransactionContextType {
  transactions: Transaction[] | null;
  setTransactions: (transactions: Transaction[] | null) => void;
  findAllTransactions: (userId: number) => Promise<boolean>;
  isTransactionsLoading: boolean;
}

interface Category {
  id: number;
  name: string;
  type: "INCOME" | "EXPENSE";
  color: string;
  icon: string;
}

interface Transaction {
  id: number;
  amount: number;
  description?: string;
  type: "INCOME" | "EXPENSE";
  category?: Category;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isTransactionsLoading, setIsTransactionsLoading] =
    useState<boolean>(false);

  const findAllTransactions = async (): Promise<boolean> => {
    setIsTransactionsLoading(true);
    try {
      const response = await axiosInstance.get(`/transactions`); // Remove userId
      if (response.data.transactions) {
        setTransactions(response.data.transactions);
        return true;
      } else {
        toast.error("No transactions found.");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions.");
      return false;
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const value: TransactionContextType = {
    transactions,
    setTransactions,
    findAllTransactions,
    isTransactionsLoading,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// model Transaction {
//   id              Int             @id @default(autoincrement())
//   userId          Int             @map("user_id")
//   categoryId      Int?            @map("category_id")
//   amount          Decimal         @db.Decimal(10, 2)
//   description     String?
//   transactionDate DateTime        @map("transaction_date") @db.Date
//   type            TransactionType
//   createdAt       DateTime        @default(now()) @map("created_at")
//   updatedAt       DateTime        @updatedAt @map("updated_at")

//   // Relations
//   user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
//   category Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)

//   @@map("transactions")
// }
