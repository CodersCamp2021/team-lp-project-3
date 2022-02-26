import express from 'express';
import GameController from '../controllers/gameController.js';
import {Game} from '../models/gameModel.js';
import { validateRequest, gameValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/:gameId', GameController.getGameDetails);

router.post('/', gameValidator, validateRequest, async (req, res) => {
  const game = new Game({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    platform: req.body.platform,
    developer: req.body.developer,
    releaseDate: req.body.releaseDate,
  });
  try {
    const savedGame = await game.save();
    res.json(savedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export { router as gameRouter };
