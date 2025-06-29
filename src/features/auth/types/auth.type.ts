import type { IUserState } from "@/features/auth";

export interface IAuthState {
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading?: boolean;
  error: string | null;
}
export type ILoginResponsePayload = Pick<
  IAuthState,
  "refreshToken" | "isAuthenticated"
> &
  Pick<IUserState, "profile">;
