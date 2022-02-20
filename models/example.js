import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
});

export const ExampleModel = mongoose.model('Example', exampleSchema);
