const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name must be provided..."],
      minlength: [3, "too short user name..."],
      maxlength: [50, "too long user name..."],
    },
    email: {
      type: String,
      required: [true, "email must be provided..."],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "email must be provided..."],
      minlength: [6, "too short user password..."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
