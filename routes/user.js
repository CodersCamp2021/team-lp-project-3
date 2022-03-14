import express from 'express';
import UserController from '../controllers/user.js';
import {
  changeEmailValidator,
  changePassValidator,
} from '../utils/validators.js';
import { validationResult } from 'express-validator';
const router = express.Router();

router.put('/changeEmail/:userId', changeEmailValidator, async (req, res) => {
  // check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (req.session.userId !== req.params.userId) {
    return res.status(403).json({
      message: 'You cannot access this data',
    });
  }
  try {
    await UserController.changeUserEmail(req.params.userId, req.body);

    return res.status(200).json({
      message: 'E-mail successfully updated.',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/changePassword/:userId', changePassValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (req.session.userId !== req.params.userId) {
    return res.status(403).json({
      message: 'You cannot access this data',
    });
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
