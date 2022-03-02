import express from 'express';
import { validationResult } from 'express-validator';
import GameController from '../controllers/game.js';
import { gameValidator } from '../utils/validators.js';

const router = express.Router();

router.post('/', gameValidator, async (req, res) => {
  // check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const game = await GameController.createGame(req.body);
    return res.json({
      message: `Successfully created game with id ${game._id}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
router.get('/', GameController.getAllGames);
router.get('/:gameId', GameController.getGameDetails);
router.delete('/:gameId', GameController.deleteGame);
router.put('/:gameId', GameController.updateGameDetails);

export { router as gameRouter };
