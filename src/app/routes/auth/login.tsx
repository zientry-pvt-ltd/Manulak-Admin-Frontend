import { useNavigate } from "react-router";
import { toast } from "sonner";

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
          toast.success("Login successful!");
        }}
        onLoginError={(error) => {
          toast.error(error.message);
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
