import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { BudgetProvider } from "./context/BudgetContext.jsx";
import { GoalProvider } from "./context/GoalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <TransactionProvider>
            <BudgetProvider>
              <GoalProvider>
                <App />
              </GoalProvider>
            </BudgetProvider>
          </TransactionProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
