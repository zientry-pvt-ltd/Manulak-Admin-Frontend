import { useEffect, useRef, useState } from "react";

import { LoadingFallback } from "@/components";
import { useRefreshAccessTokenMutation } from "@/services/auth";

const AuthRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const initRef = useRef(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  const [handleRefreshAccessToken, { isLoading }] =
    useRefreshAccessTokenMutation();

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initAuth = async () => {
      try {
        await handleRefreshAccessToken();
      } finally {
        setIsAuthInitialized(true);
      }
    };

    initAuth();
  }, [handleRefreshAccessToken]);

  if (!isAuthInitialized || isLoading) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
};
export default AuthRefreshProvider;
