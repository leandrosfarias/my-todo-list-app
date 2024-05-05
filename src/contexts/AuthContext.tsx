import React, { createContext, useContext, useState } from 'react';

// Defina o tipo para o token
type Token = string | null;

// Crie o contexto com um tipo que inclui o token e a função para defini-lo
interface AuthContextType {
  token: Token;
  setAuthToken: (newToken: Token) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<Token>(null);

  const setAuthToken = (newToken: Token) => {
    setToken(newToken);
  };
  console.log('token ==> ', token)
  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
