import type { CommonResponseDTO } from "@/types";

export type IUserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export type ILoginResponse = IRefreshAccessTokenResponse;

export type IRefreshAccessTokenResponse = CommonResponseDTO<{
  accessToken: string;
  user: {
    id: string;
    username: string;
    role: "ADMIN" | "USER";
    company_id: string;
  };
}>;

export type ILoginRequest = {
  username: string;
  password: string;
};
