import express from 'express';
import GameController from '../controllers/gameController.js';

const router = express.Router();

router.get('/:gameId', GameController.getGameDetails);
router.delete('/:gameId', GameController.deleteGame);

export { router as gameRouter };
