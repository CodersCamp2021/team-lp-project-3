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
router.get('/:userId', async (req, res) => {
  try {
    const result = await UserController.getUserInfo(req.params.userId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export { router as userRouter };
