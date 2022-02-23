import express from 'express';
import { Game } from '../models/gameModel.js';


const router = express.Router();

router
    .route('/:gameId')
    .put((req, res) => {
        res.send(`Update Game with ID ${req.params.id}`)
    }

router.param('id', (req, res, next, id) => {
    console.log(id)
    next()
})

export { router };