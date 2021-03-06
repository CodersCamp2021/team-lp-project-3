import express from 'express';
import { validationResult } from 'express-validator';
import GameController from '../controllers/game.js';
import { gameIdValidator, gameValidator } from '../utils/validators.js';
import loginRequired from '../utils/loginRequired.js';

const router = express.Router();

router.post('/', loginRequired, gameValidator, async (req, res) => {
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
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
router.get('/', async (req, res) => {
  try {
    const result = await GameController.getAllGames();
    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
router.get('/:gameId', gameIdValidator, async (req, res) => {
  // check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await GameController.getGameDetails(req.params.gameId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
router.put('/:gameId', loginRequired, gameIdValidator, async (req, res) => {
  // check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await GameController.updateGameDetails(
      req.params.gameId,
      req.body,
    );
    return res.json({
      message: `Successfully updated game with id ${result._id}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
router.delete('/:gameId', loginRequired, gameIdValidator, async (req, res) => {
  // check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await GameController.deleteGame(req.params.gameId);
    return res.json({
      message: `Successfully deleted game with id ${result._id}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export { router as gameRouter };
