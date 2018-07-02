const express = require('express');
const gameRoutes = express.Router()
const Game = require('../models/gameSchema')

gameRoutes.route('/')
    .get((req, res) => {

    })
    .post((req, res) => {

    })

gameRoutes.route('/:id')
    .get((req, res) => {

    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

module.exports = gameRoutes