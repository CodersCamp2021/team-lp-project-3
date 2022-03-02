import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import { validateRequest } from '../utils/validators.js';
import { registerValidator } from '../utils/validators.js';

const router = express.Router();

router.post('/', registerValidator, validateRequest, async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const UserSchema = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
