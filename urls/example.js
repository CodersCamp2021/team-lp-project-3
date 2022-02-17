const express = require('express')
const router = express.Router()
const ExampleModel = require('../models/example')

router.get('/', async (req, res) => {
    try {
        const exampleDataFromDB = await ExampleModel.find()
        res.status(200).json(exampleDataFromDB)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const newExample = new ExampleModel({
        name: req.body.name,
        surname: req.body.surname
    })
    try {
        const savedInDBExample = await newExample.save()
        res.status(201).json(savedInDBExample)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router