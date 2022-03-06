import { Game } from '../models/game.js';
import { User } from '../models/user.js';
import { Rate } from '../models/rate.js';

class RateController {
  getGameRate = async (req, res) => {
    try {
      const game = await Game.findById(req.body.gameId);
      if (!game) return res.status(404).json({ error: 'Game not found.' });

      const user = await User.findById(req.body.userId);
      if (!user) return res.status(404).json({ error: 'User not found.' });

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
      if (!game) return res.status(404).json({ error: 'Game not found.' });

      const user = await User.findById(req.body.userId);
      if (!user) return res.status(404).json({ error: 'User not found.' });

      // if rating === 0
      if (!req.body.rating) {
        // remove it from the collection
        await Rate.findOneAndDelete({
          gameId: req.body.gameId,
          userId: req.body.userId,
        });
        // remove 'userId' from 'ratedBy'
        if (game.ratedBy.includes(req.body.userId)) {
          game.ratedBy.splice(game.ratedBy.indexOf(req.body.userId), 1);
        }
        // remove 'gameId' from 'ratedGames'
        if (user.ratedGames.includes(req.body.gameId)) {
          user.ratedGames.splice(user.ratedGames.indexOf(req.body.gameId), 1);
        }
      } else {
        // if rating !== 0
        // add/update it in the collection
        await Rate.findOneAndUpdate(
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
        // push 'userId' to 'ratedBy'
        if (!game.ratedBy.includes(req.body.userId)) {
          game.ratedBy.push(req.body.userId);
        }
        // push 'gameId' to 'ratedGames'
        if (!user.ratedGames.includes(req.body.gameId)) {
          user.ratedGames.push(req.body.gameId);
        }
      }

      await game.save();
      await user.save();

      return res.status(200).json({ message: 'Rating updated.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}

export default new RateController();
