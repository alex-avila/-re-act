const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    gamesPlayed: {
        type: String,
    }
})

module.exports = mongoose.model('Player', playerSchema)