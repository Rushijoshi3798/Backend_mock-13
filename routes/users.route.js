const express = require("express");
const { UserModel } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const exist = await UserModel.findOne({ email });
  console.log(exist);

  if (exist) {
    if (exist.email == email) {
      res
        .status(400)
        .send({ msg: "User already exist, please login directly" });
    }
  } else {
    try {
      bcrypt.hash(password, 5, (err, hash) => {
        const user = new UserModel({
          email,
          password: hash,
          confirm_password: hash,
        });
        user.save();
        res.status(200).send({ msg: "SignUp has been successfull" });
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "SignIn Successfull",
            token: jwt.sign({ _id: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "password is Incorrect, try again" });
        }
      });
    } else {
      res
        .status(400)
        .send({ msg: "User is not present in Database, kindly SignUp First" });
    }
  } catch (error) {
    res.status(400).send({ msg: "SignIn Not Verified" });
  }
});

module.exports = {
  userRouter,
};
