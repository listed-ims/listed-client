import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { clearToken, getToken, storeToken } from '@listed-services';
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
        router.replace('/');
      } else if (isLoggedIn && inAuthRoute) {
        router.replace('/home');
      }
    }, [isLoggedIn, segments, isNavigationReady]);
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkToken();
  }, []);

  // handle token expiration and refresh

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