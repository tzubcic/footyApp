const dotenv = require("dotenv");
dotenv.config();

const path = require("path");


const express = require("express");
const cors = require("cors");
const bodyParser = require("express");

const mongoose = require('mongoose');
const dbConnect = require("./configs/database.config");
dbConnect();

// verify for API route protection
const verify = require('./middlewares/verifyToken.js')

// from routes
const usersRouter = require("./routes/usersRouter");
const playerRouter = require("./routes/playerRouter");
const matchRouter = require("./routes/matchRouter");

// port to listen
const PORT = 5000;




const leagueTableRouter = require("./routes/leagueTableRouter");

const app = express();

// format the POST request body
app.use(express.json());
// to parse the { } in the sent POST request
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public", "app")));

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

// Routers
app.use("/api/users", usersRouter);
app.use("/api/player", verify, playerRouter);
app.use("/api/match", verify, matchRouter);
app.use("/api/leagueTable", verify, leagueTableRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "app", "index.html"));
});


// listen for the server on port
app.listen(PORT, () => {
    console.log(`Server up and running on port http://localhost:${PORT} !`)
});


