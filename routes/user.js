import express from 'express';
import UserController from '../controllers/user.js';
import {
  changeEmailValidator,
  changePassValidator,
} from '../utils/validators.js';
import { validationResult } from 'express-validator';
const router = express.Router();

router.put(
  '/changeEmail/:userId',
  changeEmailValidator,
  UserController.changeUserEmail,
);
router.put('/changePassword/:userId', changePassValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await UserController.changeUserPassword(req.params.userId, req.body);

    return res.status(200).json({
      message: 'Password successfully updated.',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

export { router as userRouter };
