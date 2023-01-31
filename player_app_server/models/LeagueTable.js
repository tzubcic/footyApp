const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueTableSchema = new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teamName: {
        type: String,
    },
    played: {
        type: Number,
        default: 0
    },
    win: {
        type: Number,
        default: 0
    },
    draw: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('LeagueTable', LeagueTableSchema);