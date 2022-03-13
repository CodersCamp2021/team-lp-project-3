import express from 'express';
import UserController from '../controllers/user.js';
import {
  changeEmailValidator,
  changePassValidator,
} from '../utils/validators.js';

const router = express.Router();

router.put(
  '/changeEmail/:userId',
  changeEmailValidator,
  UserController.changeUserEmail,
);
router.put(
  '/changePassword/:userId',
  changePassValidator,
  UserController.changeUserPassword,
);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/:userId', async (req, res) => {
  try {
    const user = await UserController.getUserInfo(req.params.userId);
    if (req.params.userId == req.session.userId) {
      res.json({
        username: user.username,
        ratedGames: user.ratedGames,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.json({
        username: user.username,
        ratedGames: user.ratedGames,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: 'User not found.' });
  }
});

export { router as userRouter };
