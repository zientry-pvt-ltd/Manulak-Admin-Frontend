import * as React from "react";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div>{children}</div>
    </>
  );
};
