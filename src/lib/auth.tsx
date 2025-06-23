import { Navigate, useLocation } from "react-router";

import { paths } from "@/config/paths";
import { selectAuth } from "@/store/selectors/authSelectors";
import { useAppSelector } from "@/store/utils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
