const express = require('express')
const expressJwt = require("express-jwt")
const Player = require('../models/playerSchema')

const playerRoutes = express.Router()

const auth = expressJwt({ secret: process.env.SECRET });

playerRoutes.use(auth)

playerRoutes.route('/')
    .get((req, res) => {
        Player.findById(req.user._id, (err, player) => {
            if (err) return res.status(500).send({ success: false, err })
            if (player === null) return res.status(400).send({ success: false, err: "player not found!" })
            return res.status(200).send({ success: true, user: player.withoutPassword() })
        })
    })

module.exports = playerRoutes