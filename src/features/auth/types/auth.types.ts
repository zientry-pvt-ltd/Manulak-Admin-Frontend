import type { ROLES } from "@/constants";
import type { CommonResponseDTO } from "@/types";

export type IRoleTypes = keyof typeof ROLES;

export type IUserInfo = {
  id: string;
  username: string;
  role: IRoleTypes;
  company_id: string;
};

export type ILoginResponse = IRefreshAccessTokenResponse;

export type IRefreshAccessTokenResponse = CommonResponseDTO<{
  accessToken: string;
  user: IUserInfo;
}>;

export type ILoginRequest = {
  username: string;
  password: string;
};
