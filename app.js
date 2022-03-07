import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressSession from 'express-session';

import register from './routes/register.js';
import login from './routes/login.js';
import { gameRouter } from './routes/game.js';
import { userRouter } from './routes/user.js';
import loginRequired from './utils/loginRequired.js';

export const app = express();
dotenv.config();

// DB setup
mongoose.connect(process.env.DATABASE_PASSWORD, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// allow express get json in request body
app.use(express.json());
app.use(
  expressSession({
    name: 'team-lp-project-3',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // one day (in miliseconds)
    },
  }),
);

app.use('/register', register);
app.use('/login', login);
app.use('/games', loginRequired, gameRouter);
app.use('/user', userRouter);

app.listen(3000, () =>
  console.log('Server running on http://localhost:3000...'),
);

export default app;
