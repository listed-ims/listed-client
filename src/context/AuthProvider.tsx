import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { clearToken, storeToken } from '@listed-services';
import { useRootNavigation, useRouter, useSegments } from 'expo-router';
import { getItemAsync } from 'expo-secure-store';
import { AUTH_TOKEN_KEY } from '@listed-constants';
import { useTokenValidationMutation } from '@listed-hooks';
import { UserResponse } from '@listed-types';

interface AuthContextProps {
  isLoggedIn: boolean;
  userDetails: UserResponse | null | undefined;
  login: (token: string) => void;
  logout: () => void;
  setUserDetails: Dispatch<SetStateAction<UserResponse | null | undefined>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  userDetails: null,
  login: () => { },
  logout: () => { },
  setUserDetails: () => { },
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userDetails, setUserDetails] = useState<UserResponse | null | undefined>();
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

      const inAuthRoute = segments[0] === '(auth)';

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
      const token = await getItemAsync(AUTH_TOKEN_KEY);
      if (token) {
        validateToken();
      }
    };
    checkToken();
  }, []);

  const { mutate: validateToken } = useTokenValidationMutation({
    onSuccess: (data) => {
      if (data.valid) {
        setIsLoggedIn(true);
      }
    }
  });

  //TODO: handle token expiration and refresh

  const login = (token: string) => {
    storeToken(token);
    setIsLoggedIn(true);
  }

  const logout = () => {
    clearToken();
    setIsLoggedIn(false);
  }

  const setUser = (user: UserResponse) => {
    setUserDetails(user);
  }

  useProtectedRoute(isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setUserDetails, userDetails }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider