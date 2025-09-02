import { Navigate, useLocation } from "react-router";

import { paths } from "@/config/paths";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const location = useLocation();

  console.log("isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
