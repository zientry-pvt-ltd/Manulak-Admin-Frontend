import type { IRoleTypes } from "@/customTypes/auth.types";
import { selectAuth } from "@/store/selectors/authSelectors";
import { useAppSelector } from "@/store/utils";

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
  const auth = useAppSelector(selectAuth);

  if (!auth.isAuthenticated) {
    throw Error("User does not exist!");
  }

  const checkAccess = ({ allowedRoles }: { allowedRoles: string[] }) => {
    if (allowedRoles && allowedRoles.length > 0 && auth) {
      return allowedRoles.includes(auth.userInfo?.role || "");
    }
    return true;
  };

  return { checkAccess, role: auth.userInfo?.role };
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
