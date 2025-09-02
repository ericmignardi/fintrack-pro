import { createContext, useState, type ReactNode } from "react";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  register: (formData: RegisterFormData) => Promise<boolean>;
  login: (formData: LoginFormData) => Promise<boolean>;
  logout: () => void;
  isRegistering: boolean;
  isLoggingIn: boolean;
}

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

type RegisterFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const register = async (formData: RegisterFormData): Promise<boolean> => {
    setIsRegistering(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      console.log(response.data);
      if (response.data.message === "User registered successfully") {
        setUser(response.data.user);
        toast.success("Registration successful!");
        return true;
      } else {
        console.error("Registration failed: ", response.data.error);
        toast.error("Registration failed.");
        return false;
      }
    } catch (error: unknown) {
      console.error("Registration failed: ", error);
      toast.error("Registration failed.");
      return false;
    } finally {
      setIsRegistering(false);
    }
  };

  const login = async (formData: LoginFormData): Promise<boolean> => {
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
    } catch (error: unknown) {
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
        console.error("Logout failed: ", response.data.error);
        toast.error("Logout failed.");
      }
    } catch (error: unknown) {
      console.error("Logout failed: ", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const value: AuthContextType = {
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
