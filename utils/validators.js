import pkg from 'express-validator';
const { body, validationResult } = pkg;
import { Game } from '../models/gameModel.js';
import { User } from '../models/userModel.js';

/**
 * function throw error if validation failed
 */
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
    return Game.findOne({ platform: value }).then(() => {
      if (!platforms.includes(value)) {
        return Promise.reject('Platform not exist');
      }
    });
  }),
  body('developer').exists().isString(),
  body('releaseDate').exists().isDate(),
];

/**
 * middleware use to validate register request body
 */
const registerValidator = [
  body('firstName').exists().isLength({ min: 3, max: 31 }),
  body('secondName').exists().isLength({ min: 3, max: 31 }),
  body('username').exists().isLength({ min: 3, max: 31 }),
  body('username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Username already in user');
      }
    });
  }),
  body('email').isEmail().isLength({ min: 6, max: 255 }),
  body('email').custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject('E-mail already in use.');
      }
    });
  }),
  body('password').isLength({ min: 6, max: 1024 }),
];

export { registerValidator, gameValidator };
