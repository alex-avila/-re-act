const express = require('express')
const Player = require('../models/playerSchema')
const authRoutes = express.Router()
const jwt = require("jsonwebtoken")

authRoutes.post("/signup", (req, res) => {
    Player.findOne({ userName: req.body.userName }, (err, existingPlayer) => {
        if (err) return res.status(500).send({ success: false, err });

        if (existingPlayer !== null) {
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

        if (!player || player.password !== req.body.password) {
            return res.status(403).send({ success: false, err: "Email or password is incorrect" });
        }

        const token = jwt.sign(player.toObject(), process.env.SECRET);
        return res.send({ token: token, player: player.toObject(), success: true });
    })
})

module.exports = authRoutes