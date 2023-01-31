const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// GET users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// POST login user
router.post("/login", async (req, res) => {

    const {username, password} = req.body;

    // check for user in db
    const userExists = await User.findOne({ username });

    // check for correct password
    if(userExists && (await bcrypt.compare(password, userExists.password))){

        // create a token
        const token = jwt.sign({userExists}, process.env.TOKEN_SECRET);

        console.log(`User ${username} has logged in ... `);


        return res.header('auth-token', token).status(200).send({'auth-token': token});
        
    } else {
        return res.status(400).send({message: "Username or password is invalid!"});
    }


});

// POST register user
router.post("/register", async (req, res) => {

    console.log(`Request body -- ${JSON.stringify(req.body)}`);

    const {username, email, password, teamName} = req.body;

    // check if user, teamName exists
    const emailExists = await User.findOne({email});
    const usernameExists = await User.findOne({username});
    const teamNameExists = await User.findOne({teamName});

    if(emailExists) {
        return res.status(400).json({message: `Username already exists! Please login or register!`});
    }

    if(usernameExists) {
       return res.status(400).json({message: `Username already exists!`});
    }

    if(teamNameExists) {
        return res.status(400).json({message: `Team name already exists!`});
    }

    // generate the hashed password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // create a newUser from passed register POST
    const newUser = new User({
        username,
        email,
        password: encryptedPassword,
        teamName,
        teamPlayers: []
    });

    // save the newUser to database if not error
    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (e) {
        res.status(400).json({message: `${e.message}`});
    }

});

module.exports = router;