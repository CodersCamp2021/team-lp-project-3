import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export default class UserController {
  static register = async ({ body, session }) => {
    // check if username/email is already in database
    const username = await User.findOne({ username: body.username });
    if (username) {
      throw new Error('This username has been taken.');
    }
    const email = await User.findOne({ email: body.email });
    if (email) {
      throw new Error('This email has been taken.');
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      password: hashedPassword,
      type: 'user',
      ratedGames: [],
    });

    await user.save();

    // creates session with registered user
    session.userId = user._id;
    return { message: 'User has been successfully registered.' };
  };

  static login = async ({ body, session }) => {
    // check if email is already in database
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new Error('User with this email does not exist.');
    }

    //password is correct
    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      throw new Error('Invalid password.');
    }

    session.userId = user._id;
    return { message: 'Logged in successfully.' };
  };

  static changeUserEmail = async (userId, body) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id: ${userId} does not exist`);
    }

    // check if provided password === password in DB
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      throw new Error(`Invalid password`);
    }

    // check if email is already in database
    const email = await User.findOne({ email: body.email });
    if (email) {
      throw new Error(`Email has been taken.`);
    }

    user.email = body.email;

    // update email
    await user.save();

    return {
      message: 'E-mail successfully updated.',
    };
  };

  static changeUserPassword = async (userId, body) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id: ${userId} does not exist`);
    }

    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      throw new Error(`Invalid password`);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return {
      message: 'Password successfully updated.',
    };
  };

  static logout = async (req, res) => {
    delete req.session.userId;
    res.json({ message: 'Logged out successfully.' });
  };

  static getUserInfo = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id: ${userId} does not exist.`);
    }
    return user;
  };
}
