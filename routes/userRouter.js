import express from 'express';
import { User } from '../models/userModel.js';
import { Rating } from '../models/ratingModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/rate/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ userId: req.params.userId });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/rate/:gameId', async (req, res) => {
  try {
    const rating = new Rating({
      userId: req.body.userId,
      gameId: req.params.gameId,
      rate: req.body.rate,
    });

    const savedRating = await rating.save();
    res.status(201).json(savedRating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
