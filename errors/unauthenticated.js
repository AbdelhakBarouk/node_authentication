const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthenticatedError;
