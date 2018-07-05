const express = require('express')
const app = express();
require("dotenv").config();
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const expressJwt = require("express-jwt");

app.use(morgan('dev'))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/-re-act-arcade', (err) => {
    if (err) throw err
    console.log('Conneced to the database')
})

app.use('/auth', require('./routes/auth'))

app.use('/api', expressJwt({ secret: process.env.SECRET }))

app.use('/api/player', require('./routes/player'))
app.use('/api/games', require('./routes/games'))


app.listen(9001, () => {
    console.log('This server is located on localhost 9001')
})

