const mongoose = require('mongoose')
const md5 = require('md5')

const playerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
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
    },
    gravatar: {
        type: String
    }
})

// Add avatar image from gravatar
playerSchema.pre('save', function() {
    this.gravatar = `https://www.gravatar.com/avatar/${md5(this.email)}?d=identicon`
})

module.exports = mongoose.model('Player', playerSchema)