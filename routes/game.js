import express from 'express';
import { Game } from '../models/gameModel.js';

const router = express.Router();

router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.status(200).json(game);
  } catch (error) {
    res.json({ message: error });
  }
});

export { router };
