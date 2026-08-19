import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { secureStore } from "../store/secureStore";

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: "user" | "empresa" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isUser: () => boolean;
  isCompany: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedUser = await secureStore.getItem("user");
        const token = await secureStore.getItem("access_token");
        if (savedUser && token) {
          setUser(JSON.parse(savedUser) as User);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (token: string, userData: User) => {
    await secureStore.setItem("access_token", token);
    await secureStore.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await secureStore.removeItem("access_token");
    await secureStore.removeItem("refresh_token");
    await secureStore.removeItem("user");
    setUser(null);
  };

  const isUser = () => user?.role_id === "user";
  const isCompany = () => user?.role_id === "empresa";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        isUser,
        isCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}