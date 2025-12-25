import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

export type AuthorizationProps = {
  isLoading?: boolean;
  className?: string;
  forbiddenFallback?: ReactNode;
  children: ReactNode;
  allowedRoles?: string[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthorization = () => {
  const { isAuthenticated, userInfo } = useAppSelector(selectAuth);

  if (!isAuthenticated) {
    throw Error("User does not exist!");
  }

  const checkAccess = (allowedRoles?: string[]) => {
    if (userInfo === undefined) {
      return false;
    }

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const userRole = userInfo?.user_role;
    if (!userRole) {
      return false;
    }

    return allowedRoles.includes(userRole);
  };

  return {
    checkAccess,
    currentRole: userInfo?.user_role,
  };
};

export const Authorization: React.FC<AuthorizationProps> = ({
  forbiddenFallback = null,
  children,
  className,
  allowedRoles,
}) => {
  const { checkAccess } = useAuthorization();

  const canAccess = checkAccess(allowedRoles);

  return (
    <div className={cn(className)}>
      {canAccess ? children : forbiddenFallback}
    </div>
  );
};
