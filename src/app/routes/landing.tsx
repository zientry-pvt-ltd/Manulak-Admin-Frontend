import { useNavigate } from "react-router";

import { Button } from "@/components";
import { paths } from "@/config/paths";

const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(paths.app.dashboard.getHref());
  };

  return <Button onClick={handleStart}>Started</Button>;
};

export default LandingRoute;
