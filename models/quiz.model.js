const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    creator: String,
    title: String,
    description: String,
    questions: Array
  },
  {
    versionKey: false,
  }
);

const QuizModel = mongoose.model("quiz", quizSchema);

module.exports = {
  QuizModel,
};