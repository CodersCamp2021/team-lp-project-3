import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 31,
  },
  surname: {
    type: String,
    required: true,
    min: 3,
    max: 31,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 31,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
