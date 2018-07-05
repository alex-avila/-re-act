const express = require('express')
const Player = require('../models/playerSchema')
const authRoutes = express.Router()
const jwt = require("jsonwebtoken")

authRoutes.post("/signup", (req, res) => {
    Player.findOne({ userName: req.body.userName }, (err, existingPlayer) => {
        if (err) return res.status(500).send({ success: false, err });

        if (existingPlayer) {
            return res.status(400).send({ success: false, err: "Username is already taken!" });
        }

        const newPlayer = new Player(req.body);
        newPlayer.save((err, player) => {
            if (err) return res.status(500).send({ success: false, err });

            const token = jwt.sign(player.toObject(), process.env.SECRET);
            return res.status(201).send({ success: true, player: player.toObject(), token });
        })
    })
})

authRoutes.post("/login", (req, res) => {
    Player.findOne({ userName: req.body.userName.toLowerCase() }, (err, player) => {
        if (err) return res.status(500).send(err);

        if (!player) {
            return res.status(403).send({ success: false, err: "Email or password is incorrect" });
        } else {
            player.checkPassword(req.body.password, (err, match) => {
                if (err) throw err;
                if (!match) return res.status(401).send({ success: false, message: "Incorrect password" });
                const token = jwt.sign(player.toObject(), process.env.SECRET, { expiresIn: "24h" });
                return res.send({ token, player: player.withoutPassword(), success: true, message: "Here's your token!" })
            });
        }
    })
})

module.exports = authRoutes