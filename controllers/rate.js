import { Game } from '../models/game.js';
import { User } from '../models/user.js';
import { Rate } from '../models/rate.js';

class RateController {
  getRateGame = async (req, res) => {
    try {
      const game = await Game.findById(bookId);
      if (!game) return res.status(404).send({ error: 'no game found' });
      const user = await User.findById(userId);
      if (!user) return res.status(404).send({ error: 'no user found' });
      const rate = await Rate.findOneAndUpdate(
        { ratedGame: gameId, rater: req.user._id },
        {
          rating: req.body.rating,
          rater: req.user._id,
          ratedGame: gameId,
        },
        {
          upsert: true,
          new: true,
        },
      );
        // check if user has been given vote

      const rateExist = await User.findOne({ rating: req.body.rating });
      if (rating !== 0) {
        return res.status(400).json({ message: 'Rate has been given.' });
      }

      user.rateExist = req.body.rating;
      
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  

 
  
}

export default new RateController();
