import express from 'express';
import GameController from '../controllers/game.js';
import { gameValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/', GameController.getAllGames);
router.get('/:gameId', GameController.getGameDetails);
router.post('/', gameValidator, GameController.createGame);
router.put('/:gameId', GameController.updateGameDetails);
router.delete('/:gameId', GameController.deleteGame);

export { router as gameRouter };
