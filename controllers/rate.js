import { Game } from '../models/game.js';
import { User } from '../models/user.js';
import { Rate } from '../models/rate.js';

class RateController {
  getGameRate = async (body) => {
    const { gameId, userId } = body;
    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error('Game not found.');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const rate = await Rate.findOne({ gameId: game._id, userId: user._id });
    if (!rate) {
      return { rating: 0 };
    }

    return { rating: rate.rating };
  };

  putGameRate = async (body) => {
    const { gameId, userId, rating } = body;
    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error('Game not found.');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    // if rating === 0
    if (!rating) {
      // remove it from the collection
      await Rate.findOneAndDelete({
        gameId: gameId,
        userId: userId,
      });
      // remove 'userId' from 'ratedBy'
      if (game.ratedBy.includes(userId)) {
        game.ratedBy.splice(game.ratedBy.indexOf(userId), 1);
      }
      // remove 'gameId' from 'ratedGames'
      if (user.ratedGames.includes(gameId)) {
        user.ratedGames.splice(user.ratedGames.indexOf(gameId), 1);
      }
    } else {
      // if rating !== 0
      // add/update it in the collection
      await Rate.findOneAndUpdate(
        {
          gameId: gameId,
          userId: userId,
        },
        {
          rating: rating,
        },
        {
          upsert: true,
          new: true,
        },
      );
      // push 'userId' to 'ratedBy'
      if (!game.ratedBy.includes(userId)) {
        game.ratedBy.push(userId);
      }
      // push 'gameId' to 'ratedGames'
      if (!user.ratedGames.includes(gameId)) {
        user.ratedGames.push(gameId);
      }
    }

    await game.save();
    await user.save();

    return { message: 'Rating updated.' };
  };
}

export default new RateController();