import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginPage;
