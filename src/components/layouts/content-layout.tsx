import * as React from "react";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div
      className="flex flex-col rounded-md border p-2 mx-2"
      style={{ height: "calc(100% - 40px)" }}
    >
      <div>
        <h1 className="text-sm font-semibold text-primary">{title}</h1>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};
