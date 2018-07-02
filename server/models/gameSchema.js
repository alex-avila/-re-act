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
    }]
})

module.exports = mongoose.model('Game', gameSchema)