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
