import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { clearToken, storeToken } from '../services/tokenStorage';
import { useRootNavigation, useRouter, useSegments } from 'expo-router';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavigationReady, setNavigationReady] = useState(false);

  const useProtectedRoute = (isLoggedIn: boolean) => {
    const segments = useSegments();
    const router = useRouter();
    const rootNavigation = useRootNavigation();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthRoute = segments[0] === 'auth';

      if (
        !isLoggedIn && !inAuthRoute
      ) {
        router.replace('/auth/register');
      } else if (isLoggedIn && inAuthRoute) {
        router.replace('/');
      }
    }, [isLoggedIn, segments, isNavigationReady]);
  }

  const login = (token: string) => {
    storeToken(token);
    setIsLoggedIn(true);
  }

  const logout = () => {
    clearToken();
    setIsLoggedIn(false);
  }

  useProtectedRoute(isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider