const express = require("express");
const expressJwt = require("express-jwt");
const Player = require("../models/player.js");
const Game = require('../models/game')

const playerRoute = express.Router();

playerRoute.get("/", (req, res) => {
    Player.findById(req.user._id, (err, player) => {
        // Find all games
        // get scores that match the current user
        let allScores = {}
        Game.find()
            .populate('highScores.player')
            .exec((err, games) => {
                games.forEach(game => {
                    const gameScores = game.highScores
                        .filter(score => {
                            return score.player.username === player.username
                        })
                        .map(score => { if (score.score) { return score.score } })
                    allScores = { ...allScores, [game.url]: [...gameScores] }
                })
                if (err) return res.status(500).send({ success: false, err })
                if (player === null) return res.status(400).send({ success: false, err: "Player not found!" })
                return res.status(200).send({ success: true, player: { ...player.withoutPassword(), scores: allScores } })
            })
    })
});


module.exports = playerRoute;