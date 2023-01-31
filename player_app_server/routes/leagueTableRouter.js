const express = require("express");

const Match = require("../models/Match");
const LeagueTable = require("../models/LeagueTable");

const router = express.Router();

// GET LEAGUE TABLE
router.get("/getLeagueTable", async (req, res) => {

    // get all the teams in the league table
    const leagueTable = await LeagueTable.find();

    // return the league table
    res.json(leagueTable);

});

// GET LEAGUE TABLE TEAM
router.get("/getLeagueTableTeamByUser/:id", async (req, res) => {

        // get the team from the league table by the user id
        const leagueTableTeam = await LeagueTable.findOne({ team: req.params.id });

        // return the league table team
        res.json(leagueTableTeam);

});

// export the router
module.exports = router;

