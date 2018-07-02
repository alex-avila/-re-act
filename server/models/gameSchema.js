<<<<<<< HEAD
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    url: String,
    content: String,
    screenShot: Buffer,
    highScore: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        score: Number
=======
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
>>>>>>> master
    }]
})

module.exports = mongoose.model('Game', gameSchema)