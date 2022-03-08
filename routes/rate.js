import express from 'express';
import RateController from '../controllers/rate.js';

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
router.put('/', async (req, res) => {
  try {
    const message = await RateController.putGameRate(req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

export { router as rateRouter };
