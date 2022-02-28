import express from 'express';
import UserController from '../controllers/userController.js';
import { validateRequest } from '../utils/validators.js';

const router = express.Router();

export { router as userRouter };
