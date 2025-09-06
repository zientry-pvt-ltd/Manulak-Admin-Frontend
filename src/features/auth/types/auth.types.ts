import type { ROLES } from "@/constants";
import type { CommonResponseDTO } from "@/types";

export type IRoleTypes = keyof typeof ROLES;

export type IUserInfo = {
  id: string;
  user_name: string;
  role: IRoleTypes;
  company_id: string;
};

export type ILoginResponse = IRefreshAccessTokenResponse;

export type IRefreshAccessTokenResponse = CommonResponseDTO<{
  accessToken: string;
  user: IUserInfo;
}>;

export type ILoginRequest = {
  user_name: string;
  password: string;
};
