import mongoose from 'mongoose';
export const ratings = [0, 1, 2];

const rateSchema = new mongoose.Schema({
  rating: {
    type: Number,
    enum: ratings,
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
