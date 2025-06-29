import { Navigate, useLocation } from "react-router";

import { paths } from "@/config/paths";
import { useAuth } from "@/features/auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
