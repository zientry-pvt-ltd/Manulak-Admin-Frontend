import { useEffect, useState } from "react";

import { useAuth } from "@/features/auth";

export const AuthRefreshProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        loading..
      </div>
    );
  }

  return <>{children}</>;
};
