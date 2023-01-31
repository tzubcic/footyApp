const express = require("express");
const Match = require("../models/Match");
const LeagueTable = require("../models/LeagueTable");
const User = require("../models/User");

const router = express.Router();

// GET matches
router.get("/getAllMatches", async (req, res) => {

        // get all the matches
        const matches = await Match.find();

        // repleace the homeTeam and awayTeam ids with the actual team names from the database and return the matches to the client
        const matchesWithTeamNames = await Promise.all(matches.map(async (match) => {
            const homeTeamName = await User.findById(match.homeTeam);
            const awayTeamName = await User.findById(match.awayTeam);
            return {
                homeTeam: homeTeamName.teamName,
                awayTeam: awayTeamName.teamName,
                homeScore: match.homeScore,
                awayScore: match.awayScore
            }

        }));

        // return the matches
        res.json(matchesWithTeamNames);

});

// POST match
router.post("/addMatch", async (req, res) => {
    console.log("[ADDING MATCH]....");

    console.log(`Request body -- ${JSON.stringify(req.body)}`);

    const {homeTeam, awayTeam, homeScore, awayScore} = req.body;

    if(homeTeam === awayTeam) {

        return res.status(400).json({ message: "Home team and away team cannot be the same" });
    }

    // create a new match
    const newMatch = new Match({
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeScore: homeScore,
        awayScore: awayScore
    });

    let homeTeamName = await User.findById(homeTeam);
    let awayTeamName = await User.findById(awayTeam);

    // save match to database and then update league table with new match data and return the saved match
    const savedMatch = await newMatch.save()
            .then((savedMatch) => {
                // wait unitl update the league table with the new match data
                updateLeagueTable(homeTeam, homeTeamName.teamName, awayTeam, awayTeamName.teamName, homeScore, awayScore);

                console.log("Match saved successfully and league table updated");

                // return the saved match
                return savedMatch.toObject();

            })
            .catch((e) => {
                res.status(400).json({message: `Error adding match: ${e}`});
            }
        );

    let matchWithTeamNames = {
        homeTeam: homeTeamName.teamName,
        awayTeam: awayTeamName.teamName,
        homeScore: savedMatch.homeScore,
        awayScore: savedMatch.awayScore
    }

    // return the saved match with the team names instead of ids from the database
    res.json(matchWithTeamNames);

});

function updateLeagueTable(homeTeam, homeTeamName, awayTeam, awayTeamName, homeScore, awayScore) {

    LeagueTable.findOne({team: homeTeam})
        .then((homeTeamInTheLeagueTable) => {
            // check if home team exists in league table
            if (!homeTeamInTheLeagueTable) {
                // if it doesnt exist addit to the league table with default stats set to 0
                homeTeamInTheLeagueTable = new LeagueTable({ team: homeTeam, teamName: homeTeamName});
            }
            // update home team stats based on match result and save to database
            homeTeamInTheLeagueTable.played += 1;
            if(homeScore > awayScore) {
                homeTeamInTheLeagueTable.win += 1;
                homeTeamInTheLeagueTable.points += 3;
            } else if (homeScore < awayScore) {
                homeTeamInTheLeagueTable.lost += 1;
            } else {
                homeTeamInTheLeagueTable.draw += 1;
                homeTeamInTheLeagueTable.points += 1;
            }
            homeTeamInTheLeagueTable.save();
        });

    LeagueTable.findOne({team: awayTeam})
        .then((awayTeamInTheLeagueTable) => {

            // check if away team exists in league table
            if (!awayTeamInTheLeagueTable) {
                // if it DOES NOT EXIST add it to the league table with default stats set to 0
                awayTeamInTheLeagueTable = new LeagueTable({ team: awayTeam, teamName: awayTeamName});
            }
            // update away team stats based on match result and save to database
            awayTeamInTheLeagueTable.played += 1;
            if(awayScore > homeScore) {
                awayTeamInTheLeagueTable.win += 1;
                awayTeamInTheLeagueTable.points += 3;
            } else if (awayScore < homeScore) {
                awayTeamInTheLeagueTable.lost += 1;
            } else {
                awayTeamInTheLeagueTable.draw += 1;
                awayTeamInTheLeagueTable.points += 1;
            }
            awayTeamInTheLeagueTable.save();
        }
    );

}

// export the router
module.exports = router;