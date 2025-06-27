import { useEffect } from "react";
import { useNavigate } from "react-router";

import { AppText } from "@/components";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { paths } from "@/config/paths";
import LoginForm from "@/featuress/auth/components/login-form";
import { selectAuth } from "@/store/selectors/authSelectors";
import { login } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/utils";

const LoginRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(selectAuth);

  const handleLogin = async () => {
    await dispatch(
      login({ email: "arundeshan@gmail.com", password: "123321" }),
    );
    navigate(paths.app.dashboard.getHref(), { replace: true });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(paths.app.dashboard.getHref(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout title="Log in to your account">
      <AppText onClick={handleLogin} className="hidden">
        Login
      </AppText>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginRoute;
