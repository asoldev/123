import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
  console.log('role', role);
  console.log(location);
  

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
