import mongoose from 'mongoose';

const blacklist = new mongoose.Schema({
  token: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Blacklist = mongoose.model('Blacklist', blacklist);
