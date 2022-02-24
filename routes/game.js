import express from 'express';
import { GameModel } from '../models/gameModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await GameModel.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const newGame = new GameModel({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    platform: req.body.platform,
    developer: req.body.developer,
    releaseDate: req.body.releaseDate,
  });

  try {
    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:gameId', (req, res) => {
  try {
    GameModel.findByIdAndUpdate(req.params.gameId, req.body, (err, result) => {
      if (err) {
        return res.json({ message: err.message });
      } else {
        return res.json(result);
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
