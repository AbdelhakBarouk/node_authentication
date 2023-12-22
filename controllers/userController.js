const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermision } = require("../utils");

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
  console.log(req.user);
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!name || !email) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new CustomError.BadRequestError("no user found");
  }
  user.name = name;
  user.email = email;
  await user.save();
  res.status(StatusCodes.OK).json(user);
};
const updateUserPassword = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOneAndDelete({ _id: userId });
  if (!user) {
    throw new CustomError.BadRequestError(`no user with the id : ${userId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "user has been deleted", user });
};

module.exports = {
  getAllUsers,
  showCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
};
