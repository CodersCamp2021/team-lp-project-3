import { body } from 'express-validator';
import { platforms } from '../models/game.js';

/**
 * middleware use to validate game request body
 */
const gameValidator = [
  body('title').exists().isString(),
  body('category').exists().isString(),
  body('description').exists().isLength({ max: 1000 }),
  body('platform').exists().isIn(platforms),
  body('developer').exists().isString(),
  body('releaseDate').exists().isDate(),
];

/**
 * middleware use to validate register request body
 */
const registerValidator = [
  body('firstName').exists().isLength({ min: 3, max: 31 }),
  body('lastName').exists().isLength({ min: 3, max: 31 }),
  body('username').exists().isLength({ min: 3, max: 31 }),
  body('email').isEmail().isLength({ min: 6, max: 255 }),
  body('password').isLength({ min: 6, max: 1024 }),
];

export { registerValidator, gameValidator };
