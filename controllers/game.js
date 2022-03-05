import { validationResult } from 'express-validator';
import { Game } from '../models/game.js';

class GameController {
  getAllGames = async (req, res) => {
    try {
      const allGames = await Game.find();
      res.status(200).json(allGames);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  getGameDetails = async (req, res) => {
    try {
      const game = await Game.findById(req.params.gameId);
      res.status(200).json(game);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  deleteGame = async (req, res) => {
    try {
      const game = await Game.findByIdAndDelete(req.params.gameId);
      res.status(200).json({
        _id: game._id,
        message: `${game.title} has been successfully deleted from the DB.`,
      });
    } catch (error) {
      res.status(404).json({ message: 'Game not found.' });
    }
  };

  createGame = async (req, res) => {
    const { title, category, description, platform, developer, releaseDate } =
      req.body;

    // check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if game title is unique
    const exisiting = await Game.findOne({ title: title });
    if (exisiting) {
      return res.status(400).json({ message: 'Game title already exist' });
    }

    const game = new Game({
      title: title,
      category: category,
      description: description,
      platform: platform,
      developer: developer,
      releaseDate: releaseDate,
      ratedBy: [],
    });
    try {
      const savedGame = await game.save();
      res.json(savedGame);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  updateGameDetails = async (req, res) => {
    try {
      Game.findByIdAndUpdate(
        req.params.gameId,
        req.body,
        { new: true },
        (err, result) => {
          if (err) {
            return res.json({ message: err.message });
          } else {
            res.json({
              _id: result._id,
              message: `${result.title} has been successfully updated.`,
            });
          }
        },
      );
    } catch (err) {
      res.status(404).json({ message: 'Game not found.' });
    }
  };
}

export default new GameController();
