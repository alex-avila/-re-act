const express = require("express");
const expressJwt = require("express-jwt");
const Player = require("../models/player.js");

const playerRoute = express.Router();

playerRoute.get("/", (req, res) => {
    Player.findById(req.user._id, (err, player) => {
        if (err) return res.status(500).send({ success: false, err })
        if (player === null) return res.status(400).send({ success: false, err: "Player not found!" })
        return res.status(200).send({ success: true, player: player.withoutPassword() })
    })
});


module.exports = playerRoute;