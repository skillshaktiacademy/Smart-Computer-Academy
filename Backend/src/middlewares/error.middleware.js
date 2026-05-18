import { ApiError } from "../utils/ApiError.js";
import logger from "../config/logger.js";

/**
 * Centralized error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  logger.error(`${req.method} ${req.url} - ${error.message}`);
  
  return res.status(error.statusCode).json(response);
};

export { errorHandler };
