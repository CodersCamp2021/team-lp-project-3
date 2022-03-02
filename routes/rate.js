import express from 'express';
import RateController from '../controllers/rate.js';

const router = express.Router();

router.post('/', RateController.getRateGame);


export { router as rateRouter };