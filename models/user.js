import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 31,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 31,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 31,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  type: {
    type: String,
    required: true,
  },
  games: {
    gameId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
});

export const User = mongoose.model('User', userSchema);
