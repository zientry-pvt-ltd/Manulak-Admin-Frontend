import * as React from "react";

import { AppText } from "@/components";

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div className="flex flex-col border-y px-2 pt-2 h-[90vh] min-w-[1200px] overflow-scroll">
      {title && <AppText variant="heading">{title}</AppText>}
      {children}
    </div>
  );
};
