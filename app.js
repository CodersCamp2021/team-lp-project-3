import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import exampleRouter from './routes/example.js';

const app = express();
dotenv.config();

// DB setup
mongoose.connect(process.env.DATABASE_PASSWORD, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// allow express get json in request body
app.use(express.json());

app.use('/example', exampleRouter);

app.listen(3000, () =>
  console.log('Server running on http://localhost:3000...'),
);
