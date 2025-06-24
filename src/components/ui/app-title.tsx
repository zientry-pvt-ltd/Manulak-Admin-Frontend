import { memo, useState } from "react";

import defaultLogo from "@/assets/landscape-placeholder.svg";
import { Skeleton } from "@/components";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

const AppTitle = () => {
  const { appLogo, appName } = useAppSelector(selectApp);
  const { state } = useSidebar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isCollapsed = state === "collapsed";

  return (
    <div
      className={cn(
        "flex items-center gap-x-2",
        isCollapsed && "justify-center",
      )}
    >
      {!isLoaded && !hasError && <Skeleton className="w-6 h-6 rounded-full" />}
      <img
        src={hasError ? defaultLogo : appLogo}
        alt="App Logo"
        className={cn(
          "h-6 aspect-square rounded-full transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />

      <span
        className={cn(
          "text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis",
          isCollapsed ? "hidden" : "block",
        )}
      >
        {appName}
      </span>
    </div>
  );
};

export default memo(AppTitle);
