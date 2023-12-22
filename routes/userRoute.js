const express = require("express");
const UserRouter = express.Router();

const {
  getAllUsers,
  showCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

const {
  authenticateUser,
  autherizePermissions,
} = require("../middelwares/authentication");

UserRouter.route("/").get(
  authenticateUser,
  autherizePermissions("admin"),
  getAllUsers
);
UserRouter.route("/showMe").get(authenticateUser, showCurrentUser);
UserRouter.route("/updateUser").patch(authenticateUser, updateUser);
UserRouter.route("/updateUserPassword").patch(
  authenticateUser,
  updateUserPassword
);
UserRouter.route("/:id").get(authenticateUser, getSingleUser);

module.exports = UserRouter;
