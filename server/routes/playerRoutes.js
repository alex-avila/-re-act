const express = require('express')
const playerRoutes = express.Router()
const Player = require('../models/playerSchema');
const jwt = require("jsonwebtoken");

playerRoutes.route('/')
    .get((req, res) => {

    })

playerRoutes.post("/signup", (req, res) => {
    playerSchema.findOne({ userName: req.body.userName }, (err, existingPlayer) => {
        if (err) return res.status(500).send({ success: false, err });

        if (existingPlayer !== null) {
            return res.status(400).send({ success: false, err: "Username is already taken!" });
        }

        const newPlayer = new playerSchema(req.body);
        newPlayer.save((err, player) => {
            if (err) return res.status(500).send({ success: false, err });

            const token = jwt.sign(player.toObject(), process.env.SECRET);
            return res.status(201).send({ success: true, player: player.toObject(), token });
        })
    })
})

playerRoutes.post("/login", (req, res) => {
    playerSchema.findOne({ userName: req.body.userName.toLowerCase() }, (err, player) => {
        if (err) return res.status(500).send(err);

        if (!player || player.password !== req.body.password) {
            return res.status(403).send({ success: false, err: "Email or password is incorrect" });
        }

        const token = jwt.sign(user.toObject(), process.env.SECRET);
        return res.send({ token: token, user: user.toObject(), success: true });
    })
})

playerRoutes.route('/:playerId')
    .get((req, res) => {
        // ADD TOKEN THING //
        Player.findOne({ _id: req.body.id }, (err, foundPlayer) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(foundPlayer)
        })
    })

module.exports = playerRoutes