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

  updateGameDetails = async (gameId, body) => {
    const game = await Game.findByIdAndUpdate(gameId, body, { new: true });

    if (!game) {
      throw new Error(`Game with id: ${gameId} does not exists`);
    }

    return game;
  };

  deleteGame = async (gameId) => {
    const game = await Game.findByIdAndDelete(gameId);

    if (!game) {
      throw new Error(`Game with id: ${gameId} does not exists`);
    }
    return game;
  };
}

export default new GameController();
