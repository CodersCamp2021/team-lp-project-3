const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    }
})

module.exports = mongoose.model('Example', exampleSchema)