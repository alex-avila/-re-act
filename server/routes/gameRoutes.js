const express = require('express')
const gameRoutes = express.Router()
const Game = require('../models/gameSchema');

gameRoutes.route("/")
    .get((req, res) => {
        Game.find((err, games) => {
            if(err) return res.status(500).send(err);
            return res.status(200).send(games);
        })
    })

gameRoutes.route('/:gameId')
    .get((req, res) => {
        Game.findOne({url: req.params.gameId}, (err, foundGame) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(foundGame)
        })
    })
    .put((req, res) => {
        Game.findOneAndUpdate({_id: req.params.gameId, player: req.player._id, url: req.body}, (err, updatedGame) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(updatedGame)
        })
    })

module.exports = gameRoutes;