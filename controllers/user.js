import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export default class UserController {
  static register = async (req, res) => {
    // check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if username/email is already in database
    const username = await User.findOne({ username: req.body.username });
    if (username) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({ message: 'Email has been taken' });
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, 11);
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
  };
}
