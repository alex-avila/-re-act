const express = require('express');
const playerRoutes = express.Router()
const Player = require('../models/playerSchema')

playerRoutes.route('/')
    .get((req, res) => {

    })
    .post((req, res) => {

    })

playerRoutes.route('/:id')
    .get((req, res) => {

    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

    module.exports = playerRoutes