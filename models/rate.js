import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
  },
  rater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ratedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
});


export const Rate = mongoose.model('Rate', rateSchema);