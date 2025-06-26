import { memo } from "react";

import { AppImage, AppText, useSidebar } from "@/components";
import { cn } from "@/lib/utils";
import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

const AppTitle = () => {
  const { appName, appLogo } = useAppSelector(selectApp);
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 px-2",
        isCollapsed && "justify-center",
      )}
    >
      <AppImage imageUrl={appLogo} alt="App Logo" />

      <AppText
        as="span"
        variant="caption"
        className={cn(isCollapsed ? "hidden" : "block")}
      >
        {appName}
      </AppText>
    </div>
  );
};

export default memo(AppTitle);
