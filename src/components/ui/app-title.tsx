import { memo } from "react";

import { AppImage, useSidebar } from "@/components";
import { cn } from "@/lib/utils";
import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

const AppTitle = () => {
  const { appLogo, faviconUrl } = useAppSelector(selectApp);
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 px-2",
        isCollapsed && "justify-center px-0",
      )}
    >
      <AppImage
        width={isCollapsed ? 24 : 120}
        height={isCollapsed ? 24 : 40}
        imageUrl={isCollapsed ? faviconUrl : appLogo}
        alt="App Logo"
        rounded="rounded-none"
      />
    </div>
  );
};

export default memo(AppTitle);
