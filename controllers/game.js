import { Game } from '../models/game.js';

class GameController {
  createGame = async (body) => {
    const { title, category, description, platform, developer, releaseDate } =
      body;

    // check if game title is unique
    const exisiting = await Game.findOne({ title: title });
    if (exisiting) {
      throw new Error(`Game called ${title} already exists`);
    }

    // create game
    const game = new Game({
      title: title,
      category: category,
      description: description,
      platform: platform,
      developer: developer,
      releaseDate: releaseDate,
    });

    const savedGame = await game.save();
    return savedGame;
  };

  getAllGames = async () => {
    const allGames = await Game.find();
    return allGames;
  };

  getGameDetails = async (gameId) => {
    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error(`Game with id: ${gameId} does not exists`);
    }
    return game;
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
}

export default new GameController();
