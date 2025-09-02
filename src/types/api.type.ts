import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface CommonResponseDTO<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

export type APIError = FetchBaseQueryError & {
  data?: CommonResponseDTO<null>;
};
