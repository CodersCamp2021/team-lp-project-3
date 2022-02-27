import express from 'express';
import GameController from '../controllers/gameController.js';
import { validateRequest, gameValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/:gameId', GameController.getGameDetails);
router.put('/:gameId', GameController.updateGameDetails);

router.post('/', gameValidator, validateRequest, GameController.postGame);

export { router as gameRouter };
