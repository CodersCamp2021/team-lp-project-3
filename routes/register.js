import express from 'express';
import { dummyUserModel } from '../models/dummyUserSchema.js';
import pkg from 'express-validator';
const { body, validationResult } = pkg;
import bcrypt from 'bcrypt';
import { validateRequest } from '../utils/validators.js';
import { registerValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const exampleDataFromDB = await dummyUserModel.find();
    res.status(200).json(exampleDataFromDB);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', registerValidator, validateRequest, async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 11);
  const newDummyUserSchema = new dummyUserModel({
    username: req.body.username,
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
});

export default router;
