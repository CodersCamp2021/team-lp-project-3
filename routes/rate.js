import express from 'express';
import RateController from '../controllers/rate.js';

const router = express.Router();

router.get('/', RateController.getGameRate);
router.put('/', RateController.putGameRate);

export { router as rateRouter };
