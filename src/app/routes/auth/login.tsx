import { useEffect } from "react";
import { useNavigate } from "react-router";

import { AppText } from "@/components";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { paths } from "@/config/paths";
import { LoginForm, useAuth } from "@/features/auth";

const LoginRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogin } = useAuth();

  const handleLoginPress = async () => {
    handleLogin({ email: "arundeshan@gmail.com", password: "123321" });
    navigate(paths.app.dashboard.getHref(), { replace: true });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(paths.app.dashboard.getHref(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout title="Log in to your account">
      <AppText onClick={handleLoginPress} className="hidden">
        Login
      </AppText>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginRoute;
