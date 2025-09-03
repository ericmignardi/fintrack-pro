import { createContext, useState } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const register = async (formData) => {
    setIsRegistering(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      if (response.data.message === "User registered successfully") {
        setUser(response.data.user);
        toast.success("Registration successful!");
        return true;
      } else {
        toast.error("Registration failed.");
        return false;
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      toast.error("Registration failed.");
      return false;
    } finally {
      setIsRegistering(false);
    }
  };

  const login = async (formData) => {
    setIsLoggingIn(true);
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      if (response.data.message === "User logged in successfully") {
        setUser(response.data.user);
        toast.success("Login successful.");
        return true;
      } else {
        toast.error("Login failed.");
        return false;
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.data.message === "User logged out successfully") {
        setUser(null);
        toast.success("Logged out successfully.");
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const value = {
    user,
    setUser,
    register,
    login,
    logout,
    isRegistering,
    isLoggingIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
