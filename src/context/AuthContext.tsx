import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextType {
  user: any;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider: any = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', null);

  const login = async (data: any) => {
    console.log('AuthProvider data',data);
    setUser(data);
  };

  const logout = () => {
    setUser(null);
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
