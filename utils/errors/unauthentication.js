const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("./custom-error");

class UnAuthenticationError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = UnAuthenticationError;
