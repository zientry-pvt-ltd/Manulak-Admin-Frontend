import type { IUserState } from "@/features/auth";

export interface IAuthState {
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export type ILoginResponsePayload = Pick<
  IAuthState,
  "refreshToken" | "isAuthenticated"
> &
  Pick<IUserState, "profile">;
