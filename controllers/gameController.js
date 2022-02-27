import { Game } from '../models/gameModel.js';

class GameController {
  getGameDetails = async (req, res) => {
    try {
      const game = await Game.findById(req.params.gameId);
      res.status(200).json(game);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  postGame = async (req, res) => {
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
