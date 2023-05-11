const express = require("express");
const { LeaderboardModel } = require("../models/leaderboard.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const leaderboardRoute = express.Router();

leaderboardRoute.get("/", auth, async (req, res) => {
    const token = req.headers.authorization;
    console.log("token", token);
  
    const decoded = jwt.verify(token, "masai");
    try {
      if (decoded) {
        const leaderBoard = await LeaderboardModel.find();
        res.status(200).send(leaderBoard);
      } else {
        res.status(400).send({ msg: "The token is not verified" });
      }
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });

  leaderboardRoute.post("/leaderboard", auth, async (req,res) => {
    try{

        const leaderBoard = new LeaderboardModel(req.body);
        await leaderBoard.save();
        res.status(200).send({msg: "Score has been successfully added in Leaderboard Database"})
    }catch(err){
        res.status(400).send({msg: err.message})
    }
})


  module.exports = {
    leaderboardRoute,
  };