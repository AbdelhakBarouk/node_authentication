const express = require("express");
const UserRouter = express.Router();

const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

UserRouter.route("/").get(getAllUsers).post(createUser);
UserRouter.route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = UserRouter;
