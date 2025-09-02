import { useEffect } from "react";
import { useNavigate } from "react-router";

import { AppButton, AppText } from "@/components";
import { paths } from "@/config/paths";
import { useApp } from "@/features/settings";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

const LandingRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { appName } = useApp();

  const handleStart = () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(location.pathname), { replace: true });
    } else {
      navigate(paths.app.dashboard.getHref(), { replace: true });
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate(paths.app.root.getHref());
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex items-center justify-center h-screen text-center">
      <section>
        <header className="mb-4">
          <AppText as="h1" variant="heading">
            Welcome to {appName}
          </AppText>
        </header>

        <div className="mb-8 space-y-2">
          <AppText as="p" variant="caption">
            Click the button below to get started with IMS.
          </AppText>
          <AppText as="p" variant="caption">
            If you are not logged in, you'll be redirected to the login page.
          </AppText>
        </div>

        <AppButton onClick={handleStart}>Get Started</AppButton>
      </section>
    </main>
  );
};

export default LandingRoute;
