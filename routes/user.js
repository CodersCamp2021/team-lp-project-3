import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.put('/change/:userId', UserController.changeUserCredentials);

export { router as userRouter };
