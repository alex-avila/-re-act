const express = require('express')
const Player = require('../models/player')
const authRoutes = express.Router()
const jwt = require('jsonwebtoken')

authRoutes.post('/signup', (req, res) => {
    Player.findOne({ username: req.body.username }, (err, existingPlayer) => {
        if (err) return res.status(500).send({ success: false, err })

        if (existingPlayer) {
            return res.status(400).send({ success: false, err: "That username already exists!" });
        }

        const newPlayer = new Player(req.body);
        newPlayer.save((err, player) => {
            if (err) return res.status(500).send({ success: false, err });

            const token = jwt.sign(player.toObject(), process.env.SECRET || 'correct horse battery');
            return res.status(201).send({ success: true, player: player.withoutPassword(), token });
        })
    })
})

authRoutes.post('/login', (req, res) => {
    Player.findOne({ username: req.body.username.toLowerCase() }, (err, player) => {
        if (err) return res.status(500).send(err);

        if (!player) {
            return res.status(403).send({ success: false, err: "Player with that username was not found" })
        } else {
            player.checkPassword(req.body.password, (err, match) => {
                if (err) throw err;
                if (!match) return res.status(401).send({ success: false, message: "Incorrect password" });
                const token = jwt.sign(player.toObject(), process.env.SECRET || 'correct horse battery', { expiresIn: "24h" });
                res.send({ player: player.withoutPassword(), token, success: true, message: "Here's your token!" });
            });
        }
    })
})

module.exports = authRoutes