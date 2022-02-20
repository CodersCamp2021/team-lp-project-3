import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

export const Rating = mongoose.model('Rating', ratingSchema);
