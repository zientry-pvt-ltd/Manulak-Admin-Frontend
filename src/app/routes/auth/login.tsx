import { useNavigate } from "react-router";

import { Button } from "@/components";
import { paths } from "@/config/paths";
import { login } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/utils";

const LoginRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login({ username: "testuser", password: "password123" }));
    console.log("Login button clicked");
    navigate(paths.app.dashboard.getHref(), { replace: true });
  };
  return (
    <div>
      Log in
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginRoute;
