import pkg from 'express-validator';
const { body, validationResult } = pkg;
import { dummyUserModel } from '../models/dummyUserSchema.js';

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const registerValidator = [
  body('username').isLength({ min: 4 }),
  body('username').custom((value) => {
    return dummyUserModel.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Username already in user');
      }
    });
  }),
  body('password').isLength({ min: 8 }),
  body('email').isEmail(),
  body('email').custom((value) => {
    return dummyUserModel.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject('E-mail already in user');
      }
    });
  }),
];

export { registerValidator };
