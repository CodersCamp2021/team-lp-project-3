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

    const game = new Game({
      title: title,
      category: category,
      description: description,
      platform: platform,
      developer: developer,
      releaseDate: releaseDate,
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
  };
}

export default new GameController();
