import type { ROLES } from "@/constants";
import type { ApiResource } from "@/types";

export type IRoleTypes = keyof typeof ROLES;

export type IUserInfo = {
  user_id: string;
  user_name: string;
  user_role: IRoleTypes;
  company_id: string;
};

export interface ICompanyInfo {
  company_id: string;
  company_name: string;
  company_description: string;
  company_images: string[];
  phone: string;
  email: string | null;
  address: string | null;
  support_number: string | null;
  bank_details: string | null;
  social_media: string | null;
}

export type IRefreshAccessTokenResponse = ApiResource<{
  access_token: string;
  user: IUserInfo;
  company: ICompanyInfo;
}>;

export type ILoginResponse = IRefreshAccessTokenResponse;

export type ILoginRequest = {
  user_name: string;
  password: string;
};
