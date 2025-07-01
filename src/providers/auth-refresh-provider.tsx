import { useEffect, useState } from "react";

import { LoadingFallback } from "@/components";
import { useAuth } from "@/features/auth";

const AuthRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { handleRefreshAccessToken } = useAuth();

  useEffect(() => {
    const initAuth = async () => {
      await handleRefreshAccessToken();
      setLoading(false);
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
};
export default AuthRefreshProvider;
