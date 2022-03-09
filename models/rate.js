import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  rating: {
    type: Number,
    enum: [-1, 0, 1],
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
});

export const Rate = mongoose.model('Rate', rateSchema);
