const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  checkPermision,
  CreateUserToken,
  attachCookiesToResponse,
} = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ count: users.length, users: users });
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new CustomError.BadRequestError(`no user with the id : ${userId}`);
  }
  //check for the permission
  checkPermision(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  const user = await User.findOne({ _id: req.user.userId });

  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  user.name = name;
  user.email = email;
  await user.save();

  const userToken = CreateUserToken(user);
  const token = attachCookiesToResponse({ res, user: userToken });
  res.status(StatusCodes.OK).json(user);
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isMatchPassword = await user.comparePassword(oldPassword);
  if (!isMatchPassword) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "password updated successuflly" });
};

module.exports = {
  getAllUsers,
  showCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
};
