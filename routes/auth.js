import express from 'express';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const savedUser = await user.save();
    res.status(201).json({ data: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.json(user);
});

export default router;
