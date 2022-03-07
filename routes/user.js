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

export { router as userRouter };
