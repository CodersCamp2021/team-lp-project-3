import express from 'express';
import { validationResult } from 'express-validator';
import UserController from '../controllers/user.js';
import {
  changeEmailValidator,
  changePassValidator,
  registerValidator,
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
router.post('/register', registerValidator, async (req, res) => {
  // check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const response = await UserController.register(req);
    return res.status(201);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

export { router as userRouter };
