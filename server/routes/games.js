const express = require("express");
const gamesRoutes = express.Router();
const Game = require("../models/game");

gamesRoutes.get("/", (req, res) => {
    Game.find((err, games) => {
        if (err) return res.status(500).send(err);
        return res.send(games);
    });
});

gamesRoutes.post("/", (req, res) => {
    console.log(req.body.scores)
    const game = new Game(req.body);
    game.save(function (err, newGame) {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newGame);
    });
});

gamesRoutes.get("/:gameId", (req, res) => {
    // Game.findOne({ url: req.params.gameId }, (err, game) => {
    //     if (err) return res.status(500).send(err);
    //     if (!game) return res.status(404).send("No game found.");
    //     return res.send(game);
    // });
    Game.findOne({ url: req.params.gameId })
        .populate({
            path: 'highScores.player',
            model: 'Player'
        })
        .exec((err, game) => {
            if (err) return res.status(500).send(err);
            if (!game) return res.status(404).send("No game found.");
            return res.send(game)
        });;
});

gamesRoutes.put("/:gameId", (req, res) => {
    Game.findOneAndUpdate(
        { url: req.params.gameId },
        { $push: req.body },
        { new: true },
        (err, game) => {
            if (err) return res.status(500).send(err);
            return res.send(game);
        }
    );
});

gamesRoutes.delete("/:gameId", (req, res) => {
    Game.findOneAndRemove({ url: req.params.gameId }, (err, game) => {
        if (err) return res.status(500).send(err);
        return res.send(game);
    });
});

module.exports = gamesRoutes;