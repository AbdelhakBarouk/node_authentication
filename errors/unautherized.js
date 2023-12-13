const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class UnAutherizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnAutherizedError;
