import type { ROLES } from "@/constants";

export interface IAuthState {
  userInfo: {
    firstName: string;
    lastName: string;
    role: IRoleTypes;
    profileUrl: string | null;
  } | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
}
export type ILoginResponsePayload = Pick<
  IAuthState,
  "userInfo" | "refreshToken"
>;

export type IRoleTypes = keyof typeof ROLES;
