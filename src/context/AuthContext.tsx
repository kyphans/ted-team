import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextType {
  user: string;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: '',
  login: () => {},
  logout: () => {},
});

export const AuthProvider: any = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', '');
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', '');

  const login = async (data: any) => {
    const { token, refreshToken, info } = data;
    setUser(JSON.stringify(data));
    setAccessToken(token);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setUser('');
    setAccessToken('');
    setRefreshToken('');
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};
