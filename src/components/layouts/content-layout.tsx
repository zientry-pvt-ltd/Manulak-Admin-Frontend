import * as React from "react";

import { AppText } from "@/components";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div className="flex flex-col rounded-md border px-2 py-1 mx-2 h-[92vh] overflow-y-scroll">
      <AppText variant="heading">{title}</AppText>
      {children}
    </div>
  );
};
