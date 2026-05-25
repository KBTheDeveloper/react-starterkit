export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  statusCode: number;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): ApiErrorResponse {
    return {
      success: false,
      error: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}
