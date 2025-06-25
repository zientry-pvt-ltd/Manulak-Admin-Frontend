import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components";
import { paths } from "@/config/paths";
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
    <div>
      Log in
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginRoute;
