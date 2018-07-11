const express = require('express')
const app = express();
require("dotenv").config();
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const path = require('path')
const port = process.env.PORT || 9001

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/-re-act-arcade', (err) => {
    if (err) throw err
    console.log('Conneced to the database')
})

app.use('/auth', require('./routes/auth'))

app.use('/api', expressJwt({ secret: process.env.SECRET || 'correct horse battery' }))

app.use('/api/player', require('./routes/player'))
app.use('/api/games', require('./routes/games'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

