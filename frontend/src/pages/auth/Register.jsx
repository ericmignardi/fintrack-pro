import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layout/AuthLayout";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const { user, register, isRegistering } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const success = await register({ email, password, firstName, lastName });
      if (success) {
        navigate("/");
      } else {
        setError("Registration failed. Please check your input.");
        toast.error("Registration failed.");
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
      title="Create an account"
      subtitle="Please enter your details"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--primary-blue)] hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First name"
          className="text-sm font-medium border border-[var(--neutral-gray)]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last name"
          className="text-sm font-medium border border-[var(--neutral-gray)]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />

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
          disabled={isRegistering}
          type="submit"
        >
          {isRegistering ? "Registering..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
