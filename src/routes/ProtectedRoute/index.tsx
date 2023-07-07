import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();
  const userData = !!user && JSON.parse(user);
  if (!userData?.info || !userData?.token) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
