import type { AxiosError } from "axios";

/* ------------------------------------------------------------------ */
/*  API Error (matches backend contract)                               */
/* ------------------------------------------------------------------ */

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  statusCode: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiError;

/* ------------------------------------------------------------------ */
/*  Axios wrapper                                                      */
/* ------------------------------------------------------------------ */

export type ApiAxiosError = AxiosError<ApiError>;

/* ------------------------------------------------------------------ */
/*  Form field errors (useful for Ant Design forms)                    */
/* ------------------------------------------------------------------ */

export interface FormFieldError {
  field: string;
  message: string;
}

export type FormErrors = Record<string, string>;

/* ------------------------------------------------------------------ */
/*  Type guards                                                        */
/* ------------------------------------------------------------------ */

export function isApiError(response: unknown): response is ApiError {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false &&
    "error" in response &&
    typeof (response as ApiError).error === "string"
  );
}

export function isAxiosApiError(error: unknown): error is ApiAxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as AxiosError).isAxiosError === true &&
    isApiError((error as AxiosError).response?.data)
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Safely extract a human-readable message from an API or unknown error.
 * Falls back to `defaultMessage` when the error shape is unrecognized.
 */
export function extractApiErrorMessage(
  error: unknown,
  defaultMessage = "Something went wrong"
): string {
  if (isAxiosApiError(error)) {
    return error.response?.data.error ?? defaultMessage;
  }

  if (isApiError(error)) {
    return error.error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}

/**
 * Extract an HTTP status code from an error, if available.
 */
export function extractApiErrorStatusCode(error: unknown): number | undefined {
  if (isAxiosApiError(error)) {
    return error.response?.data.statusCode ?? error.response?.status;
  }
  if (isApiError(error)) {
    return error.statusCode;
  }
  return undefined;
}
