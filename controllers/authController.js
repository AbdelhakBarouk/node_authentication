const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const {
  createJWT,
  isValideToken,
  attachCookiesToResponse,
  CreateUserToken,
} = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError.BadRequestError("please provide all needed values");
  }
  //first registred user is an admin
  const isFirstRegistredUser = (await User.countDocuments()) === 0;
  const role = isFirstRegistredUser ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const userToken = CreateUserToken(user);
  attachCookiesToResponse({ res, user: userToken });

  res.status(StatusCodes.OK).json(user);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnAuthenticatedError("invalide cridentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError("invalide cridentials");
  }

  //jwt part
  const payload = CreateUserToken(user);
  attachCookiesToResponse({ res, user: payload });

  res.status(StatusCodes.OK).json({ user });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expire: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logeed out" });
};

module.exports = { register, login, logout };
