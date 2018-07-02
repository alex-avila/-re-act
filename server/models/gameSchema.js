const mongoose = require('mongoose')

// const scoreSchema = new mongoose.Schema({
//     player: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Player'
//     },
//     score: {
//         type: Number,
//         required: true
//     }
// })

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