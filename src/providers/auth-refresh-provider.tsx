import { useEffect, useState } from "react";

import { refreshAccessToken, setAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/utils";

export const AuthRefreshProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const accessTokenResponse = await dispatch(refreshAccessToken());

      if (refreshAccessToken.fulfilled.match(accessTokenResponse)) {
        dispatch(setAuth(true));
      } else {
        console.error("Failed to refresh token:", accessTokenResponse.payload);
      }
      setLoading(false);
    };

    initAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        loading..
      </div>
    );
  }

  return <>{children}</>;
};
