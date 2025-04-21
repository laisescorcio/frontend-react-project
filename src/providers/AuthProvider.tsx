import React, { createContext, useContext, ReactNode } from "react";
import { apiBase } from "../services/api";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TOKEN_REFERENCE = "token";

interface AuthContextData {
  token: string | null;
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useLocalStorage(TOKEN_REFERENCE, null);

  const isAuthenticated = !!token;

  const logout = () => {
    setToken(null);
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      const result = await apiBase.post<{ access_token: string }>(
        "auth/login",
        data
      );

      const accessToken = result.data.access_token;
      setToken(accessToken);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
