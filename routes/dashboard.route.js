const express = require("express");
const dashboardRoute = express.Router();
const { QuizModel } = require("../models/quiz.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");

dashboardRoute.get("/", auth, async (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token);

  const decoded = jwt.verify(token, "masai");
  try {
    if (decoded) {
      const quiz = await QuizModel.find();
      res.status(200).send(quiz);
    } else {
      res.status(400).send({ msg: "The token is not verified" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

dashboardRoute.post("/quiz", auth, async (req, res) => {
  try {
    const quiz = new QuizModel(req.body);
    await quiz.save();
    res.status(200).send({ msg: "Quiz has been successfully added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

dashboardRoute.patch("/update/:id", auth, async (req, res) => {
  const token = req.headers.authorization;

  console.log(req.params);
  const payload = req.body;
  const decoded = jwt.verify(token, "masai");
  console.log(decoded);

  const req_id = decoded._id;

  const postID = req.params.id;
  const quiz = await QuizModel.findOne({ _id: postID });
  console.log("quiz", quiz);
  const userID_in_post = quiz._id;

  let fID = userID_in_post + "";

  try {
    console.log("Hello", userID_in_post, postID, req_id);

    if (fID.includes(postID)) {
      await QuizModel.findByIdAndUpdate({ _id: quiz._id }, payload);
      res.status(200).send({ msg: "Quiz has been successfully Updated" });
    } else {
      res
        .status(400)
        .send({ msg: "you are not authorized to update the Quiz" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

dashboardRoute.delete("/delete/:id", auth, async (req, res) => {
  const token = req.headers.authorization;

  console.log(req.params);
  const decoded = jwt.verify(token, "masai");
  console.log(decoded);

  if (decoded) {
    const req_id = decoded._id;

    const postID = req.params.id;
    const quiz = await QuizModel.findOne({ _id: postID });
    const userID_in_post = quiz._id;

    let fID = userID_in_post + "";

    try {
      console.log(userID_in_post, postID, req_id);

      if (fID.includes(postID)) {
        await QuizModel.findByIdAndDelete({ _id: quiz._id });
        res.status(200).send({ msg: "Quiz has been successfully Deleted" });
      } else {
        res.status(400).send({ msg: "This Quiz is Not exist in Database" });
      }
    } catch (error) {
      res.status(400).send({ msg: "Something went wrong" });
    }
  } else {
    res
      .status(400)
      .send({ msg: "You are not authorize to delete Any Quiz from Database" });
  }
});

module.exports = {
  dashboardRoute,
};
