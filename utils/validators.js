import mongoose from 'mongoose';
import { body, param } from 'express-validator';
import { platforms } from '../models/game.js';

/**
 * Middleware use to validate game request body
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
 * Middleware use to validate register request body
 */
const registerValidator = [
  body('firstName').exists().isLength({ min: 3, max: 31 }),
  body('lastName').exists().isLength({ min: 3, max: 31 }),
  body('username').exists().isLength({ min: 3, max: 31 }),
  body('email').isEmail().isLength({ min: 6, max: 255 }),
  body('password').isLength({ min: 6, max: 1024 }),
];

/**
 * Middleware - email validation
 */
const changeEmailValidator = [
  body('email').exists().isEmail().isLength({ min: 6, max: 255 }),
  body('password').exists().isLength({ min: 6, max: 1024 }),
];

/**
 * Middleware - password validation
 */
const changePassValidator = [
  body('password').exists().isLength({ min: 6, max: 1024 }),
  body('newPassword').exists().isLength({ min: 6, max: 1024 }),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Password confirmation does not match password.');
    }
    return true;
  }),
];

/**
 * Middleware - gameId from URL validation
 */
const gameIdValidator = [
  param('gameId').custom((value) => {
    if (!mongoose.isValidObjectId(value)) {
      throw new Error(`Game with id: ${value} does not exist`);
    }
    return true;
  }),
];

/**
 * Middleware - gameId from URL validation
 */
const bodyGameIdValidator = [
  body('gameId').custom((value) => {
    if (!mongoose.isValidObjectId(value)) {
      throw new Error(`Game with id: ${value} does not exist`);
    }
    return true;
  }),
];

/**
 * Middleware use to validate login request body
 */
const loginValidator = [
  body('email').isEmail().isLength({ min: 6, max: 255 }),
  body('password').isLength({ min: 6, max: 1024 }),
];

export {
  registerValidator,
  gameValidator,
  changeEmailValidator,
  changePassValidator,
  gameIdValidator,
  loginValidator,
  bodyGameIdValidator,
};
