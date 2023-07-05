import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const { user } = useAuth();
  const userData = JSON.parse(user ?? null);
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
