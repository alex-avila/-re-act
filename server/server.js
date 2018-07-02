const express = require('express')
const App = express();
require("dotenv").config();
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const expressJwt = require("express-jwt");

App.use(morgan('dev'))
App.use(bodyParser.json())

mongoose.connect('mongodb://localhost/re-act-arcade', (err) => {
    if (err) throw err
    console.log('conneced to the database')
})

<<<<<<< HEAD
App.use('/players', require('./routes/playerRoutes'))
App.use('/games', require('./routes/gameRoutes'))
=======
App.use("/api", expressJwt({secret: process.env.SECRET}));
App.use("/players", require("./routes/playerRoutes"));
App.use("/api/player", require());
App.use("/games", require('./routes/gameRoutes'))
>>>>>>> master

App.listen(9001, () => {
    console.log('this server is located on localhost 9001')
})

