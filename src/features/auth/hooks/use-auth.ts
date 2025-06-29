import { login, refreshAccessToken } from "@/features/auth";
import { logout, setAuth } from "@/features/auth/store/slices/authSlice";
import { selectAuth } from "@/store/selectors/authSelectors";
import { useAppDispatch, useAppSelector } from "@/store/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(selectAuth);

  const handleLogin = (credentials: { email: string; password: string }) => {
    dispatch(login(credentials));
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
    handleLogin,
    handleLogout,
    handleRefreshAccessToken,
  };
};
