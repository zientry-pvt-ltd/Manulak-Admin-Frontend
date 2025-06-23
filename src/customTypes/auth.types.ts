export interface IAuthState {
  user: {
    name: string;
    role: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
