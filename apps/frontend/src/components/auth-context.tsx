import { useState, createContext, useContext } from "react";

export type Usuario = {
  nome: string;
  email: string;
  id: number;
};

export interface AuthContext {
  usuario: Usuario;
}

interface AuthContextType {
  authContext: AuthContext | undefined;
  setAuthContext: (authContext: AuthContext | undefined) => void;
  logout: () => void;
}

const CONTEXT_KEY = "authContext";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider(props: any) {
  const [authContext, setAuthContext] = useState<AuthContext | undefined>(() => {
    const stored = window.localStorage.getItem(CONTEXT_KEY);

    if (stored && stored !== "undefined") {
      return JSON.parse(stored);
    }
  });

  const setLocalStorage = (authContext: AuthContext | undefined) => {
    window.localStorage.setItem(CONTEXT_KEY, JSON.stringify(authContext));
    setAuthContext(authContext);
  };

  const logout = () => {
    setLocalStorage(undefined);
  };

  return <AuthContext.Provider value={{ authContext, setAuthContext: setLocalStorage, logout }} {...props} />;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuthContext must be used within a AuthContextProvider`);
  }
  return context;
}
