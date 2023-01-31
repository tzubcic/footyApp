const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    homeTeam: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    awayTeam: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    homeScore: {
        type: Number,
        default: 0
    },
    awayScore: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Match', MatchSchema);
