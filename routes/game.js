import express from 'express';
import GameController from '../controllers/gameController.js';

const router = express.Router();

router.get('/:gameId', GameController.getGameDetails);
router.put('/:gameId', GameController.updateGameDetails);

export { router as gameRouter };
