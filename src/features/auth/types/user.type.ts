import type { ROLES } from "@/constants";

export interface IUserState {
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    profileUrl: string;
    email: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export type IRoleTypes = keyof typeof ROLES;
