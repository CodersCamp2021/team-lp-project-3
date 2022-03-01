import express from 'express';
import UserController from '../controllers/user.js';
import { loginValidator } from '../utils/validators.js';

const router = express.Router();

router.post('/', loginValidator, UserController.login);

export default router;
