import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={user ? <Transactions /> : <Navigate to="/login" />}
        />
        <Route
          path="/budgets"
          element={user ? <Budgets /> : <Navigate to="/login" />}
        />
        <Route
          path="/goals"
          element={user ? <Goals /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
