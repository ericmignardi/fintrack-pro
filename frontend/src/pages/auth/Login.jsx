import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layout/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { user, login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const success = await login({ email, password });
      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password.");
        toast.error("Login failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your details"
      footer={
        <>
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--primary-blue)] hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="text-sm font-medium border border-[var(--neutral-gray)]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="text-sm font-medium border border-[var(--neutral-gray)]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />

        {error && <p className="text-[var(--danger-red)] text-sm">{error}</p>}

        <button
          className="text-sm font-medium rounded-lg text-white bg-[var(--primary-blue)] hover:bg-[var(--secondary-blue)] cursor-pointer py-3 transition"
          disabled={isLoggingIn}
          type="submit"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
