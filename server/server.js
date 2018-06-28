const express = require('express')
const App = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

App.use(morgan('dev'))
App.use(bodyParser.json())

mongoose.connect('mongodb://localhost/re-act-arcade', (err) => {
    if (err) throw err
    console.log('conneced to the database')
})

App.listen(9001, () => {
    console.log('this server is located on localhost 9001')
})

