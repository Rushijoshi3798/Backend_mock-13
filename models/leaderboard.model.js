const mongoose = require("mongoose");

const leaderboardSchema = mongoose.Schema(
  {
    email: String,
    score: Number
  },
  {
    versionKey: false,
  }
);

const LeaderboardModel = mongoose.model("leaderboard", leaderboardSchema);

module.exports = {
    LeaderboardModel,
};