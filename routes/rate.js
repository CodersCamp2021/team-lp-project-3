import express from 'express';
import RateController from '../controllers/rate.js';
import { validationResult } from 'express-validator';
import { ratingValidator } from '../utils/validators.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rating = await RateController.getGameRate(req.body);
    return res.status(200).json(rating);
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});
router.put('/', ratingValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const message = await RateController.updateGameRate(req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as rateRouter };
