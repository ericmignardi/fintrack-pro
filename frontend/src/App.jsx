import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "react-hot-toast";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import ProtectedLayout from "./components/layout/ProtectedLayout";

function App() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/goals" element={<Goals />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
