const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

//hash the password before save the user
userSchema.pre("save", async function () {
  //if the password not changed
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
