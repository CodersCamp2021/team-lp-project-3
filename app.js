const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// DB setup 
mongoose.connect(process.env.DATABASE_PASSWORD, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to db"))

// allow express get json in request body
app.use(express.json())

const exampleModule = require('./urls/example')
app.use('/example', exampleModule)

app.listen(3000, () => console.log('Server Started'))
