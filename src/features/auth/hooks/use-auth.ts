import { logout, setAuth } from "@/features/auth";
import {
  login,
  refreshAccessToken,
} from "@/features/auth/store/thunks/authThunk";
import { selectAuth } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(selectAuth);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    await dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRefreshAccessToken = async () => {
    const accessTokenResponse = await dispatch(refreshAccessToken());

    if (refreshAccessToken.fulfilled.match(accessTokenResponse)) {
      dispatch(setAuth(true));
    } else {
      console.error("Failed to refresh token:", accessTokenResponse.payload);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    handleLogin,
    handleLogout,
    handleRefreshAccessToken,
  };
};
