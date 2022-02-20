import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import { registerValidation, loginValidation } from '../validation.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    // validate user
    await registerValidation(req.body);

    // check if email or username does not exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json({ userId: savedUser._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    // validate user
    await loginValidation(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  // check if email exist
  const user = await User.find({ email: req.body.email });
  if (!user) {
    return res.json({ message: 'Email or password are incorrect' });
  }

  // compare passwords
  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.json({ message: 'Email or password are incorrect' });
  }

  res.json({ message: 'Logged in!' });
});

export default router;
