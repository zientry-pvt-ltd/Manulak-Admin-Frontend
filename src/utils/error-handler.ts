import type { APIError, CommonResponseDTO } from "@/types";

export function handleApiError(
  error: unknown,
  // eslint-disable-next-line no-unused-vars
  onError?: (err: CommonResponseDTO<null>) => void,
) {
  if (isAPIError(error) && error.data) {
    onError?.(error.data);
    return error.data.message;
  }
  return "Something went wrong. Please try again.";
}

function isAPIError(error: unknown): error is APIError {
  return typeof error === "object" && error !== null && "status" in error;
}
