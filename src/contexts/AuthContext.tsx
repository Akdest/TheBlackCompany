"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAPI } from "@/services/api";

/* ===================== TYPES ===================== */

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  cart: CartItem[];
  wishlist: CartItem[];
  contactnumber: string;
}

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contactnumber: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterPayload) => Promise<void>;
  signout: () => void;
  updateUser: (userData: User) => void;
}

/* ===================== CONTEXT ===================== */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/* ===================== PROVIDER ===================== */

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const userData: User = await authAPI.getCurrentUser();
          setUser(userData);
        }
      } catch (error: unknown) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signin = async (email: string, password: string): Promise<void> => {
    try {
      const userData: User = await authAPI.signin(email, password);
      setUser(userData);
    } catch (error: unknown) {
      throw error;
    }
  };

  const register = async (userData: RegisterPayload): Promise<void> => {
    try {
      const newUser: User = await authAPI.register(userData);
      setUser(newUser);
    } catch (error: unknown) {
      throw error;
    }
  };

  const signout = (): void => {
    authAPI.signout();
    setUser(null);
  };

  const updateUser = (userData: User): void => {
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    loading,
    signin,
    register,
    signout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
