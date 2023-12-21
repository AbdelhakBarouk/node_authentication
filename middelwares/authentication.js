const CustomError = require("../errors");
const { isValideToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  //check if the token present in the request
  if (!token) {
    throw new CustomError.UnAuthenticatedError("unauthenticated user");
  }

  //check if the token is valide
  try {
    const valideToken = isValideToken({ token });
    const { name, userId, role } = valideToken;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError("unauthenticated user");
  }
};
const autherizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAutherizedError(
        "unautherized user for this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, autherizePermissions };
