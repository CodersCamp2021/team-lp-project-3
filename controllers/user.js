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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const UserSchema = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      type: 'user',
      ratedGames: [],
    });
    try {
      const savedInDBExample = await UserSchema.save();
      res.status(201).json(savedInDBExample);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  static changeUserEmail = async (req, res) => {
    // check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);
      // check if provided password === password in DB
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid password.' });
      }

      // check if email is already in database
      const email = await User.findOne({ email: req.body.email });
      if (email) {
        return res.status(400).json({ message: 'Email has been taken.' });
      }
      user.email = req.body.email;

      // update email
      await user.save();
      return res.status(200).json({
        message: 'E-mail successfully updated.',
      });
    } catch (error) {
      return res.status(400).json({ error: 'User not found.' });
    }
  };

  static changeUserPassword = async (req, res) => {
    // check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);
      // check if provided password === password in DB
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid password.' });
      }

      // hashing password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      user.password = hashedPassword;

      // update password
      await user.save();
      return res.status(200).json({
        message: 'Password successfully updated.',
      });
    } catch (error) {
      return res.status(400).json({ error: 'User not found.' });
    }
  };
  
  static login = async (req, res) => {
    // check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if email is already in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User with this email does not exist.' });
    }

    //password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '30m',
    });
    res.header('auth-token', token).json({message: "Logged in successfully"});
  };
}