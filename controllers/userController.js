const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ count: users.length, users: users });
};
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError.BadRequestError("please provide all needed fields");
  }
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.OK).json({ user });
};
const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.BadRequestError(`no user with the id : ${userId}`);
  }
  res.status(StatusCodes.OK).json(user);
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
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOneAndDelete({ _id: userId });
  if (!user) {
    throw new CustomError.BadRequestError(`no user with the id : ${userId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "user has been deleted", user });
};

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
