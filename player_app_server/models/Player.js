const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    defense: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Player', PlayerSchema);
