import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import { validateRequest } from '../utils/validators.js';
import { registerValidator } from '../utils/validators.js';

const router = express.Router();

router.post('/', registerValidator, validateRequest, async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 11);
  const UserSchema = new User({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    type: 'user',
    ratings: [],
  });
  try {
    const savedInDBExample = await UserSchema.save();
    res.status(201).json(savedInDBExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
