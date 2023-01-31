const express = require("express");

const User = require("../models/User");
const Player = require("../models/Player");


const router = express.Router();

// GET players
router.get("/getAllPlayers", async (req, res) => {
    const players = await Player.find();
    res.json(players);
});

router.post("/addPlayer", async (req, res) => {
    const player = new Player({
        name: req.body.name,
        attack: req.body.attack,
        defense: req.body.defense,
        position: req.body.position
    });
    try {
        const savedPlayer = await player.save();
        return res.status(201).send(savedPlayer);
    }
    catch (e) {
        res.status(400).json({message: `Error adding player: ${e}`});
    }
});

router.get("/getPlayerById/:id", async  (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        return res.status(200).send(player);
    }
    catch (e) {
        res.status(400).json({message: `Error getting player: ${e}`});
    }
});

router.put("/updatePlayer/:id", async (req, res) => {
    console.log(`Request body -- ${JSON.stringify(req.body)}`);

    try {

        const updatedPlayer = await Player.updateOne(
            { _id: req.params.id },  // filter
            { $set:
                    { name: req.body.name,
                        attack: req.body.attack,
                        defense: req.body.defense,
                        position: req.body.position
                    }
            });// update

        return res.status(200).send(updatedPlayer);
    } catch (e) {
        res.status(400).json({message: `Error updating player: ${e}`});
    }
});


router.delete("/deletePlayer/:id", async (req, res) => {

    // delete player from all users
    try {
        User.updateMany({}, { $pull: { teamPlayers: req.params.id } }, (error, result) => {
            if (error) {
                console.log(error);
            }
            // Handle error or result
            console.log(result);
        });

        // delete player from db
        const removedPlayer = await Player.remove({ _id: req.params.id });
        return res.status(200).send(removedPlayer);

    } catch (e) {
        res.status(400).json({message: `Error deleting player: ${e}`});
    }
});


// PLAYER-USER RELATIONSHIP

router.get("/getPlayersByUserId/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findById(req.params.id);
        const teamPlayers = user.teamPlayers;
        const players = await Player.find({_id: {$in: teamPlayers}});
        console.log(players);
        return res.status(200).send(players);
    } catch (e) {
        res.status(400).json({message: `Error getting players: ${e.message}`});
    }
});

router.get("/getPlayersNotInTeamByUserId/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const teamPlayers = user.teamPlayers;
        const players = await Player.find({_id: {$nin: teamPlayers}});
        return res.status(200).send(players);
    } catch (e) {
        res.status(400).json({message: `Error getting players: ${e.message}`});
    }

});

router.put("/addPlayerToUserTeam/:id", async (req, res) => {
    console.log(`id from route: ${req.params.id}`);
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id },  // filter
            { $push:
                    { teamPlayers: req.body.playerId }
            });// update

        console.log(`[ADDING PLAYER TO TEAM] user -- ${JSON.stringify(updatedUser.modifiedCount)} and player ADDED with id -- ${req.body.playerId}`);

        return res.status(200).send(updatedUser);
    } catch (e) {
        res.status(400).json({message: `Error updating user: ${e.message}`});
    }

});

router.put("/removePlayerFromUserTeam/:id", async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id },  // filter
            { $pull:
                    { teamPlayers: req.body.playerId }
            });// update

        console.log(`[DELETING PLAYER FROM TEAM] Updated user -- ${JSON.stringify(updatedUser.modifiedCount)} and player REMOVED with id -- ${req.body.playerId}`);

        return res.status(200).send(updatedUser);
    } catch (e) {
        res.status(400).json({message: `Error updating user: ${e.message}`});
    }

});

// export the router
module.exports = router;