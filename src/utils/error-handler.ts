import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type { NormalizedAPIError } from "@/types";

const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === "object" && error != null && "status" in error;
};

const isSerializedError = (error: unknown): error is SerializedError => {
  return typeof error === "object" && error != null && "message" in error;
};

export const normalizeError = (error: unknown): NormalizedAPIError => {
  if (isFetchBaseQueryError(error)) {
    return {
      status: error.status,
      message: (error as any).data?.message ?? "Unexpected API error",
      details: (error as any).data,
    };
  } else if (isSerializedError(error)) {
    return {
      status: "CLIENT_ERROR",
      message: error.message ?? "Unknown client error",
    };
  } else {
    return {
      status: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
    };
  }
};
