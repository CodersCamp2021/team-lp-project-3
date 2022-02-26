import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000
  },
  platform: {
    type: String,
    required: true,
    enum: ['PS4', 'PS5', 'PC', 'XBOX ONE', 'XBOX SERIES S/X']
  },
  developer: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
})

export const Game = mongoose.model('Game', gameSchema)