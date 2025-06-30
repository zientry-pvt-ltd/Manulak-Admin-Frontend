import type { ReactNode } from "react";

import { AppLinearProgress } from "@/components";
import type { ProgressLabel } from "@/components/ui/app-linear-progress";
import { type IRoleTypes, useAuth, useUser } from "@/features/auth";
import { cn } from "@/lib/utils";

export type AuthorizationProps = {
  isLoading?: boolean;
  loadingLabel?: ProgressLabel;
  className?: string;
  forbiddenFallback?: ReactNode;
  children: ReactNode;
} & (
  | {
      allowedRoles: IRoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthorization = () => {
  const { isAuthenticated } = useAuth();
  const { userInfo } = useUser();

  if (!isAuthenticated) {
    throw Error("User does not exist!");
  }

  const checkAccess = ({ allowedRoles }: { allowedRoles: string[] }) => {
    if (allowedRoles && allowedRoles.length > 0 && isAuthenticated) {
      return allowedRoles.includes(userInfo?.role || "");
    }
    return true;
  };

  return { checkAccess, role: userInfo?.role };
};

export const Authorization: React.FC<AuthorizationProps> = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
  isLoading = false,
  loadingLabel = "Loading...",
  className,
}) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return (
    <div className={cn(className)}>
      {isLoading ? (
        <AppLinearProgress label={loadingLabel} />
      ) : canAccess ? (
        children
      ) : (
        forbiddenFallback
      )}
    </div>
  );
};
