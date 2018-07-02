const express = require('express')
const gameRoutes = express.Router()
const Game = require('../models/gameSchema');

gameRoutes.route('/:gameId')
    .get((req, res) => {
        Game.findOne({url: req.body.url}, (err, foundGame) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(foundGame)
        })
    })
    .put((req, res) => {
        Game.findOneAndUpdate({url: req.body}, (err, updatedGame) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(foundGame)
        })
    })

module.exports = gameRoutes