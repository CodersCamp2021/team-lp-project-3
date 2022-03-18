import mongoose from 'mongoose';

export const platforms = ['PS4', 'PS5', 'PC', 'XBOX ONE', 'XBOX SERIES S/X'];

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 5000,
  },
  platform: [
    {
      type: String,
      required: true,
      enum: platforms,
    },
  ],
  developer: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
  },
  cover: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const Game = mongoose.model('Game', gameSchema);
