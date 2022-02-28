import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';

class UserController {
  changeUserCredentials = async (req, res) => {
    if (req.body.email) {
      try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
          email: req.body.email,
        });
        return res.status(200).json({
          message: 'E-mail successfully updated.',
        });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }

    if (req.body.password) {
      try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 11);
        const user = await User.findByIdAndUpdate(req.params.userId, {
          password: hashedPassword,
        });
        return res.status(200).json({
          message: 'Password successfully updated.',
        });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
  };
}

export default new UserController();
