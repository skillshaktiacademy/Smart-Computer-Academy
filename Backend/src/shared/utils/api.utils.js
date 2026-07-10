/**
 * Custom Error class for API errors
 * @extends Error
 */
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Builds an ApiError(400,...) from a Zod validation error, flattening
   * field issues into a readable message + structured errors array.
   */
  static fromZodError(zodError) {
    const errors = zodError.errors?.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    })) || [];
    const summary = errors.map((e) => `${e.path}: ${e.message}`).join(", ");
    return new ApiError(400, `Validation Error: ${summary}`, errors);
  }
}

/**
 * Standard API response class
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

/**
 * Higher-order function to handle async errors in Express routes.
 * Converts ZodErrors thrown inside the handler into ApiError(400,...)
 * before forwarding to the centralized error handler.
 * @param {Function} requestHandler
 * @returns {Function}
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      if (err?.name === "ZodError") {
        return next(ApiError.fromZodError(err));
      }
      next(err);
    });
  };
};

export { ApiError, ApiResponse, asyncHandler };
