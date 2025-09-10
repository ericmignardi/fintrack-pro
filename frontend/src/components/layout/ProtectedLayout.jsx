import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header";

function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ProtectedLayout;
