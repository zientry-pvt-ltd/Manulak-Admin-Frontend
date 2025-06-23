import { useNavigate } from "react-router";

import { Button } from "@/components";
import { paths } from "@/config/paths";
import { selectAuth } from "@/store/selectors/authSelectors";
import { useAppSelector } from "@/store/utils";

const LandingRoute = () => {
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);

  const handleStart = () => {
    if (auth.isAuthenticated) {
      navigate(paths.app.dashboard.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };

  return <Button onClick={handleStart}>Started</Button>;
};

export default LandingRoute;
