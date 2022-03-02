import express from 'express';
import UserController from '../controllers/user.js';
import { registerValidator } from '../utils/validators.js';

const router = express.Router();

router.post('/', registerValidator, UserController.register);

export default router;
