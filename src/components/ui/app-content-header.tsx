import { ChevronRight } from "lucide-react";

import { AppIcon, AppText } from "@/components";
import useCurrentPageName from "@/hooks/use-current-page";

const AppContentHeader = () => {
  const currentPage = useCurrentPageName();

  return (
    <div className="flex items-center bg-sidebar h-[6vh] px-2">
      <AppText variant="caption">{currentPage}</AppText>
      <AppIcon Icon={ChevronRight} size="sm" />
    </div>
  );
};

export default AppContentHeader;
