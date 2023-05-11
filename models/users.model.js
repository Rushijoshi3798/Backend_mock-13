const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    
    email: String,
    password: String
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};