import express from 'express';
import { dummyUserModel } from '../models/dummyUserSchema.js';
import pkg from 'express-validator';
const { body, validationResult } = pkg;
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const exampleDataFromDB = await dummyUserModel.find();
    res.status(200).json(exampleDataFromDB);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  '/',
  body('nickname').isLength({ min: 4 }),
  body('nickname').custom((value) => {
    return dummyUserModel.findOne({ nickname: value }).then((user) => {
      if (user) {
        return Promise.reject('Nickname already in user');
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 11);
    const newDummyUserSchema = new dummyUserModel({
      nickname: req.body.nickname,
      password: hashedPassword,
      email: req.body.email,
      type: 'user',
      ref: [],
    });
    try {
      const savedInDBExample = await newDummyUserSchema.save();
      res.status(201).json(savedInDBExample);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

export default router;
