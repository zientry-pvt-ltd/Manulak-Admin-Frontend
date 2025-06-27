import { ChevronRight } from "lucide-react";

import { AppIcon, AppText } from "@/components";

const AppContentHeader = () => {
  return (
    <div className="flex items-center bg-sidebar h-[6vh] px-2">
      <AppText variant="caption">Dashboard</AppText>
      <AppIcon Icon={ChevronRight} size="sm" />
    </div>
  );
};

export default AppContentHeader;
