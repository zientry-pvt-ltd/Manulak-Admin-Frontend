import { Link } from "react-router";

import { AppButton, AppText } from "@/components";
import { paths } from "@/config/paths";

const NotFoundRoute = () => {
  return (
    <div className="flex h-screen w-full justify-center flex-col items-center">
      <AppText as="h1" variant="heading" className="mb-4">
        404 - Not Found
      </AppText>
      <AppText variant="caption">
        Sorry, the page you are looking for does not exist.
      </AppText>
      <Link to={paths.home.getHref()} replace>
        <AppButton size="md" variant="link">
          Go to Home
        </AppButton>
      </Link>
    </div>
  );
};

export default NotFoundRoute;
