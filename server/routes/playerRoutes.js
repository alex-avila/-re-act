const express = require('express')
const playerRoutes = express.Router()
const expressJwt = require("express-jwt")
const Player = require('../models/playerSchema')

const auth = expressJwt({ secret: process.env.SECRET });

playerRoutes.use(auth)

// playerRoutes.route('/')
//     .get((req, res) => {
//         Player.find((err, players) => {
//             if (err) return res.status(500).send(err)
//             return res.status(200).send(players)
//         })
//     })

playerRoutes.route('/')
    .get((req, res) => {
        Player.findOne({ _id: req.user._id }, (err, user) => {
            if (err) return res.status(500).send({ success: false, err })
            if (user === null) return res.status(400).send({ success: false, err: "User not found!" })
            return res.status(200).send({ success: true, user })
            // const token = jwt.sign(foundPlayer.toObject(), process.env.SECRET);
            // return res.status(200).send({ token: token, player: foundPlayer.toObject(), success: true });
        })
    })

module.exports = playerRoutes