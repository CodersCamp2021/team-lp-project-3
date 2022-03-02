import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

class UserController {
  changeUserEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid password.' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'User not found.' });
    }

    try {
      const email = await User.findOne({ email: req.body.email });
      if (email) {
        return res.status(400).json({ message: 'Email has been taken.' });
      }

      await User.findByIdAndUpdate(req.params.userId, {
        email: req.body.email,
      });
      return res.status(200).json({
        message: 'E-mail successfully updated.',
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  changeUserPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid password.' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'User not found.' });
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      await User.findByIdAndUpdate(req.params.userId, {
        password: hashedPassword,
      });
      return res.status(200).json({
        message: 'Password successfully updated.',
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };
}

export default new UserController();
