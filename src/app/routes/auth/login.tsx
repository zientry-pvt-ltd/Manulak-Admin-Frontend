import { useNavigate } from "react-router";

import { AuthLayout } from "@/components/layouts/auth-layout";
import { paths } from "@/config/paths";
import { LoginForm } from "@/features/auth";

const LoginRoute = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Log in to your account">
      <LoginForm
        onLoginSuccess={() => {
          navigate(paths.app.dashboard.getHref(), { replace: true });
          // toast.success("Login successful!");
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
