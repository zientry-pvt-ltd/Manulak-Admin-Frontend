import { useNavigate } from "react-router";

import { Button } from "@/components";
import { paths } from "@/config/paths";
import { useAuth } from "@/features/auth";

const LandingRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(location.pathname), { replace: true });
    } else {
      navigate(paths.app.dashboard.getHref(), { replace: true });
    }
  };

  return (
    <Button onClick={handleStart} className="m-auto mt-20 flex">
      Started
    </Button>
  );
};

export default LandingRoute;
