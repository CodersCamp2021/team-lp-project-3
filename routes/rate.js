import express from 'express';
import { validationResult } from 'express-validator';
import RateController from '../controllers/rate.js';
import loginRequired from '../utils/loginRequired.js';
import { ratingValidator, bodyGameIdValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/:gameId', async (req, res) => {
  try {
    const rating = await RateController.getGameRates(req.params.gameId);
    return res.status(200).json(rating);
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const rating = await RateController.getGameRate(
      req.body.gameId,
      req.body.userId,
    );
    return res.status(200).json(rating);
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});

router.get('/count', bodyGameIdValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const count = await RateController.getRateCount(req.body.gameId);
    return res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/', loginRequired, ratingValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const message = await RateController.updateGameRate(
      req.body.gameId,
      req.body.userId,
      req.body.rating,
    );
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as rateRouter };
