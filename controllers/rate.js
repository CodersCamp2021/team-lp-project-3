import { Game } from '../models/game.js';
import { User } from '../models/user.js';
import { Rate } from '../models/rate.js';

class RateController {
  getGameRate = async (req, res) => {
    try {
      const game = await Game.findById(req.body.gameId);
      if (!game) return res.status(404).json({ error: 'No game found.' });

      const user = await User.findById(req.body.userId);
      if (!user) return res.status(404).json({ error: 'No user found.' });

      const rate = await Rate.findOne({ gameId: game._id, userId: user._id });
      if (!rate) return res.status(200).json({ rating: 0 });
      return res.status(200).json({ rating: rate.rating });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  putGameRate = async (req, res) => {
    try {
      const game = await Game.findById(req.body.gameId);
      if (!game) return res.status(404).json({ error: 'No game found.' });

      const user = await User.findById(req.body.userId);
      if (!user) return res.status(404).json({ error: 'No user found.' });

      const rate = await Rate.findOneAndUpdate(
        {
          gameId: req.body.gameId,
          userId: req.body.userId,
        },
        {
          rating: req.body.rating,
        },
        {
          upsert: true,
          new: true,
        },
      );

      // push userId to game.ratedBy array or remove it if rating === 0
      if (!game.ratedBy.includes(rate.userId)) {
        game.ratedBy.push(rate.userId);
      } else if (game.ratedBy.includes(rate.userId) && !rate.rating) {
        game.ratedBy.splice(game.ratedBy.indexOf(rate.userId), 1);
      }

      // push gameId to user.ratedGames array or remove it if rating === 0
      if (!user.ratedGames.includes(rate.gameId)) {
        user.ratedGames.push(rate.gameId);
      } else if (user.ratedGames.includes(rate.gameId) && !rate.rating) {
        user.ratedGames.splice(user.ratedGames.indexOf(rate.gameId), 1);
      }

      await game.save();
      await user.save();

      return res.status(200).json({ message: 'Rating updated.' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new RateController();
