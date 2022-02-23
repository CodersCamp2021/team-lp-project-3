import { Game } from '../models/gameModel.js';

class GameController {
  game_details = async (req, res) => {
    try {
      const game = await Game.findById(req.params.gameId);
      res.status(200).json(game);
    } catch (error) {
      res.json({ message: error });
    }
  };
}

export default new GameController();
