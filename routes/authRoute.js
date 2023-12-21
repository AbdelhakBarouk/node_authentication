const { register, login, logout } = require("../controllers/authController");
const express = require("express");
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

module.exports = authRouter;
