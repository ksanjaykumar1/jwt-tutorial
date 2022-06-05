const { StatusCodes } = require("http-status-codes");

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return CustomAPIError(msg, statusCode);
};

const badRequest = (msg) => {
  return new CustomAPIError(msg, StatusCodes.BAD_REQUEST);
};

const unauthentication = (msg) => {
  return new CustomAPIError(msg, StatusCodes.UNAUTHORIZED);
};

module.exports = {
  CustomAPIError,
  createCustomError,
  badRequest,
  unauthentication,
};
