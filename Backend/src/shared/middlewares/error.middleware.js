import { ApiError } from "../utils/api.utils.js";
import logger from "../utils/logger.js";

/**
 * Centralized error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error.name === "ValidationError" ? 400 : error.code === 11000 ? 409 : 500);
    const message =
      error.code === 11000
        ? `Duplicate value for ${Object.keys(error.keyValue || {}).join(", ") || "field"}`
        : error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  };

  logger.error(`${req.method} ${req.url} - ${error.message}`);

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
