import React, { ReactNode, createContext, useState } from 'react'
import { clearToken, storeToken } from '../services/tokenStorage';


interface AuthContextProps {
  isLoggedIn: boolean;
  loginAuth: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  loginAuth: () => { },
  logout: () => { },
});

interface AuthProviderProps {
  children: ReactNode,
}


const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAuth = (token: string) => {
    storeToken(token);
    setIsLoggedIn(true);
  }

  const logout = () => {
    clearToken();
    setIsLoggedIn(false);
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn, loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider