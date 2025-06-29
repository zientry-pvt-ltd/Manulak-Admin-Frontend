import { type IRoleTypes, useAuth, useUser } from "@/features/auth";

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
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

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
