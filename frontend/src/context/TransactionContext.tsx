import { createContext, type ReactNode } from "react";

type TransactionContextType = {};

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TransactionContext.Provider value={{}}>
      {children}
    </TransactionContext.Provider>
  );
};
