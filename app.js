import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';

import { gameRouter } from './routes/game.js';
import { rateRouter } from './routes/rate.js';
import { userRouter } from './routes/user.js';
import loginRequired from './utils/loginRequired.js';

export const app = express();
dotenv.config();

let appPort = 3001;
if (process.env.PORT) {
  appPort = process.env.PORT;
}

// DB setup
mongoose.connect(process.env.DATABASE_PASSWORD, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// allow express get json in request body
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost',
      'http://localhost:3000',
      'https://coderscamp2021.github.io',
      'https://team-lp-project-4.herokuapp.com',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
app.enable('trust proxy');
app.use(
  expressSession({
    name: 'team-lp-project-3',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_PASSWORD }),
    proxy: true,
    cookie: {
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60, // 1000 * 60 * 60 * 24,  one day (in miliseconds)
    },
    proxy: true,
  }),
);

app.use('/games', gameRouter);
app.use('/rate', rateRouter);
app.use('/user', userRouter);

app.listen(appPort, () =>
  console.log(`Server running on http://localhost:${appPort}...`),
);

export default app;
