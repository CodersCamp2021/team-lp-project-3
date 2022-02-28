import express from 'express';
import GameController from '../controllers/gameController.js';
import { validateRequest, gameValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/', GameController.getAllGames);
router.get('/:gameId', GameController.getGameDetails);
router.delete('/:gameId', GameController.deleteGame);
router.put('/:gameId', GameController.updateGameDetails);

router.post('/', gameValidator, validateRequest, GameController.createGame);

export { router as gameRouter };
