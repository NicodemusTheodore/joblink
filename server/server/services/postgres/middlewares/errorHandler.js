const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = error.errors[0].message;
  }

  if (error.message === "INVALID_INPUT") {
    statusCode = 401;
    message = "Invalid email or password";
  }

  if (error.message === "UNAUTHORIZED" || error.name === "jsonWebTokenError") {
    statusCode = 401;
    message = "Unauthorized! Please login first";
  }

  if (error.message === "FORBIDDEN") {
    statusCode = 403;
    message = "You don't have access to do this action";
  }

  if (error.message === "NO_DUPLICATE_ALLOWED") {
    statusCode = 400;
    message = "Admin with this username and email already exist";
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
