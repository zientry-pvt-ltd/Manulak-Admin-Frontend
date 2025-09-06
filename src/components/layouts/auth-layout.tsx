import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { AppText } from "@/components";
import { paths } from "@/config/paths";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-md p-6 sm:px-8 sm:py-14">
        <div className="mb-6 text-center">
          <AppText variant="subheading">{title}</AppText>
        </div>
        {children}
      </div>
    </div>
  );
};
