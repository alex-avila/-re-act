const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

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

playerSchema.pre("save", function (next) {  
    var user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

// Add avatar image from gravatar
playerSchema.pre('save', function() {
    this.gravatar = `https://www.gravatar.com/avatar/${md5(this.email)}?d=retro`
})

playerSchema.methods.checkPassword = function(passwordAttempt, callback) {  
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

playerSchema.methods.withoutPassword = function () {  
    const player = this.toObject();
    delete player.password;
    return player;
};

module.exports = mongoose.model('Player', playerSchema)