import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/error.js";

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Fallback for unexpected errors
  const statusCode = (err as any).statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    statusCode,
  });
};
