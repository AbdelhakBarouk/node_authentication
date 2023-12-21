const express = require("express");
const UserRouter = express.Router();

const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  authenticateUser,
  autherizePermissions,
} = require("../middelwares/authentication");

UserRouter.route("/")
  .get(authenticateUser, getAllUsers)
  .post(authenticateUser, createUser);
UserRouter.route("/:id")
  .get(authenticateUser, getSingleUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, autherizePermissions("admin"), deleteUser);

module.exports = UserRouter;
