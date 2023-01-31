const mongoose = require('mongoose');


const UserSchema = new  mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    teamName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    teamPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
});

module.exports = mongoose.model('User', UserSchema);
