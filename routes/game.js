import express from 'express';
import GameController from '../controllers/gameController.js';

const router = express.Router();

router.get('/:gameId', GameController.getGameDetails);

export { router as gameRouter };
