import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }:any) => {
  const { user } = useAuth();
  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};