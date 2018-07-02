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

App.use("/api", expressJwt({secret: process.env.SECRET}));
App.use("/playerRoutes", require("./routes/playerRoutes"));
App.use("/api/player", require());

App.listen(9001, () => {
    console.log('this server is located on localhost 9001')
})

