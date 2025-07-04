import { NextFunction, Request, Response } from "express";
interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}
const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // let error = { ...err };
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    if (err.name === "CastError") {
      message = "Resource not found";
      statusCode = 404;
    }
    if (err.code === 11000) {
      message = "Duplicate field value entered";
      statusCode = 400;
    }
    if (err.name === "ValidationError" && err.errors) {
      message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      statusCode = 400;
    }
    res.status(statusCode).json({
      success: false,
      message,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
