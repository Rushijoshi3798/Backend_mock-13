const express = require("express");
const cors = require("cors")
const { connection } = require("./db");
const { userRouter } = require("./routes/users.route");
const { auth } = require("./middlewares/auth");
const { dashboardRoute } = require("./routes/dashboard.route");
const { leaderboardRoute } = require("./routes/leaderboard.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.status(200).send({msg: "Home Page"})
})

app.use("/users", userRouter);
app.use("/auth", auth);
app.use("/dashboard", dashboardRoute);
app.use("/leaderboard", leaderboardRoute);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Oops!! Connection request failed ! Cannot connected to MongoDB");
    }

    console.log("server is running on secured port");
})