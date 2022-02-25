import pkg from 'express-validator';
const { body, validationResult } = pkg;
import { Game } from '../models/gameModel.js';

export function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    next();
  }

const gameValidator = [
    body('title').custom((value) => {
        return Game.findOne({ title: value }).then((game) => {
          if (game) {
            return Promise.reject('Game title already exist');
          }
        });
      }),
]

export {gameValidator};