import { memo, useState } from "react";

import defaultLogo from "@/assets/landscape-placeholder.svg";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/components";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

type AppTitleProps = {
  titleVisible?: boolean;
};

const AppTitle = ({ titleVisible = false }: AppTitleProps) => {
  const { appLogo, appSmallLogo, appName } = useAppSelector(selectApp);
  const { state } = useSidebar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isCollapsed = state === "collapsed";

  const getAppNameTwoLetters = () => {
    const words = appName.split(" ");
    if (words.length === 0) return "NA";
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-x-1 mt-2 mx-2">
      {isCollapsed ? (
        <Avatar className="rounded-lg">
          <AvatarImage src={appSmallLogo || defaultLogo} alt="App Logo" />
          <AvatarFallback>{getAppNameTwoLetters()}</AvatarFallback>
        </Avatar>
      ) : (
        <>
          {!isLoaded && !hasError && (
            <Skeleton className="w-8 h-8 rounded-full" />
          )}
          <img
            src={hasError ? defaultLogo : appLogo}
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
        </>
      )}

      {titleVisible && !isCollapsed && (
        <span className="text-xs font-semibold">{appName}</span>
      )}
    </div>
  );
};

export default memo(AppTitle);
