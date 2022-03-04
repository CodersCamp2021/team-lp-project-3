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

      // // check if game was rated before
      // const rateExists = await User.findOne({ rating: req.body.rating });
      // if (rating !== 0) {
      //   return res.status(400).json({ message: 'Rate has been given.' });
      // }

      // user.rateExist = req.body.rating;
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
      return res.status(200).json({ message: 'Rating updated.' });

      // // check if game was rated before
      // const rateExists = await User.findOne({ rating: req.body.rating });
      // if (rating !== 0) {
      //   return res.status(400).json({ message: 'Rate has been given.' });
      // }

      // user.rateExist = req.body.rating;
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new RateController();
