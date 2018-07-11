const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    url: String,
    highScores: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        score: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('Game', gameSchema)