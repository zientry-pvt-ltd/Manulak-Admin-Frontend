import { useEffect } from "react";
import { useNavigate } from "react-router";

import { AuthLayout } from "@/components/layouts/auth-layout";
import { paths } from "@/config/paths";
import { LoginForm } from "@/features/auth";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

const LoginRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isAuthenticated) navigate(paths.app.root.getHref());
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout title="Log in to your account">
      <LoginForm
        onLoginSuccess={() => {
          navigate(paths.app.dashboard.getHref(), { replace: true });
        }}
        onLoginError={(error) => {
          toast.error(error.message);
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
