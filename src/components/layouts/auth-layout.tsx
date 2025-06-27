import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import AppText from "@/components/ui/app-text";
import { paths } from "@/config/paths";
import { selectAuth } from "@/store/selectors/authSelectors";
import { useAppSelector } from "@/store/utils";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useAppSelector(selectAuth);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
        replace: true,
      });
    }
  }, [user.isAuthenticated, navigate, redirectTo]);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <AppText variant="heading">{title}</AppText>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </>
  );
};
