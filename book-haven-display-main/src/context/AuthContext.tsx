import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  memberSince: string;
  booksRead: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  demoLogin: () => Promise<boolean>;
  logout: () => void;
}

const DEMO_USER: User = {
  id: "demo-001",
  name: "Alex Thompson",
  email: "demo@libraria.com",
  role: "student",
  memberSince: "2025-01-15",
  booksRead: 47,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email && password) {
      setUser({
        ...DEMO_USER,
        email,
      });
      return true;
    }
    return false;
  };

  const demoLogin = async (): Promise<boolean> => {
    setUser(DEMO_USER);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
