import express from 'express';
import { GameModel } from '../models/gameModel.js';

const router = express.Router();

/**
 * DUMMY GET - NEEDS TO BE REPLACED
 */
router.get('/', async (req, res) => {
  try {
    const games = await GameModel.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DUMMY POST - NEEDS TO BE REPLACED
 */
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

/**
 * Middleware that takes properties which needs to be updated,
 * if success returns String "Updated", otherwise return error message
 */
router.put('/:gameId', (req, res) => {
  try {
    GameModel.findByIdAndUpdate(
      req.params.gameId,
      req.body,
      { new: true },
      (err) => {
        if (err) {
          return res.json({ message: err.message });
        } else {
          return res.json({ message: 'Updated' });
        }
      },
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
