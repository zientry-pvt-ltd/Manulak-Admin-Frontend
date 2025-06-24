import { memo, useState } from "react";

import defaultLogo from "@/assets/landscape-placeholder.svg";
import { Skeleton } from "@/components";
import { cn } from "@/lib/utils";
import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

type AppTitleProps = {
  titleVisible?: boolean;
};

const AppTitle = ({ titleVisible = false }: AppTitleProps) => {
  const app = useAppSelector(selectApp);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center gap-x-1 mt-2 mx-2">
      {!isLoaded && !hasError && <Skeleton className="w-8 h-8 rounded-full" />}
      <img
        src={hasError ? defaultLogo : app.appLogo}
        alt="App Logo"
        className={cn(
          "inline-block h-8 rounded-full transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />
      {titleVisible && (
        <span className="text-xs font-semibold">{app.appName}</span>
      )}
    </div>
  );
};
export default memo(AppTitle);
