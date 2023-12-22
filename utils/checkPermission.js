const CustomError = require("../errors");

const checkPermision = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnAutherizedError(
    "Not authorized to access this route"
  );
};

module.exports = checkPermision;
