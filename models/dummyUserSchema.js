import mongoose from 'mongoose';

const dummyUserSchema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
  },
  ref: {
    type: [],
  },
});

export const dummyUserModel = mongoose.model('User', dummyUserSchema);
