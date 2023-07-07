import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../context/AuthContext';
import { UserLocalStorageDataType } from '../../types/user.types';

function LoginPage() {
  const { user } = useAuth();
  const userData: UserLocalStorageDataType = !!user && JSON.parse(user);
  if (userData?.info && userData?.token) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginPage;
