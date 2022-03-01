import express from 'express';
import { loginValidator, validateRequest } from '../utils/validators.js';

const router = express.Router();

router.post('/', loginValidator, validateRequest, (req, res) => {
  console.log(req);
  res.send(req.body);
});

export default router;
