import { Navigate } from "react-router";

import { paths } from "@/config/paths";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login.getHref()} replace />;
  }

  return children;
};

export default ProtectedRoute;
