import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import {
  registerValidation,
  loginValidation,
  updateValidation,
  hashPassword,
} from '../validation.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  if (req.params.userId.length !== 24) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:userId', async (req, res) => {
  // if userId have not 24 signs
  if (req.params.userId.length !== 24) {
    return res.status(400).json({ message: 'User not found' });
  }

  // validate what user sent in request
  try {
    await updateValidation(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  // check if user exists
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body.newEmail
        ? { email: req.body.newEmail }
        : { password: await hashPassword(req.body.newPassword) },
      { new: true },
    );

    res.json(updatedUser);
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ message: 'Email or password are incorrect' });
  }

  // compare passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.json({ message: 'Email or password are incorrect' });
  }

  res.json({ message: 'Logged in!' });
});

export default router;
