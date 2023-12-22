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

UserRouter.route("/").get(authenticateUser, getAllUsers);
UserRouter.route("/showMe").get(authenticateUser, showCurrentUser);
UserRouter.route("/:id").get(authenticateUser, getSingleUser);

module.exports = UserRouter;
