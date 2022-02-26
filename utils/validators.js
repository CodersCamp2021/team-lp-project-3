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
  body('category').exists().isString(),
  body('description').exists().isLength({ max: 1000 }),
  body('platform').custom((value) => {
    var platforms = ['PS4', 'PS5', 'PC', 'XBOX ONE', 'XBOX SERIES S/X'];
    return Game.findOne({ platform: value }).then(() =>{
      if(!platforms.includes(value)){
        return Promise.reject('Platform not exist');
      }
    })  
  }),
  body('developer').exists().isString(),
  body('releaseDate').exists().isDate(),
]

export {gameValidator};