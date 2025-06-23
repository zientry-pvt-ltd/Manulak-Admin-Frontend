import { selectAuth } from "@/store/selectors/authSelectors";
import { useAppSelector } from "@/store/utils";

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthorization = () => {
  const auth = useAppSelector(selectAuth);

  if (!auth.isAuthenticated) {
    throw Error("User does not exist!");
  }

  const checkAccess = ({ allowedRoles }: { allowedRoles: string[] }) => {
    if (allowedRoles && allowedRoles.length > 0 && auth) {
      return allowedRoles.includes(auth.user?.role || "");
    }
    return true;
  };

  return { checkAccess, role: auth.user?.role || "guest" };
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

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

type RoleTypes = keyof typeof ROLES;
