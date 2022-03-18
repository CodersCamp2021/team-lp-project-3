import fetch from 'node-fetch';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from '../models/game.js';

const app = express();
dotenv.config();

// Run `npm run insert` to start the server.
// send an empty `POST` request to `/` path to insert game records into the DB.
// DB setup
mongoose.connect(process.env.DATABASE_PASSWORD, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// allow express get json in request body
app.use(express.json());

const gamesURL = 'https://api.igdb.com/v4/games/';

const getData = async () => {
  try {
    const response = await fetch(gamesURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': 'dik3ye3ha5u1ktuy09lfi3zx7o9get',
        Authorization: 'Bearer igeghv2icfol7htbx96k82c2w0rfh7',
      },
      body: `fields name, genres.name, summary, platforms.slug, involved_companies.developer, involved_companies.company.name, first_release_date, cover.image_id; 
      where hypes > 40 & themes != (42) & platforms.slug = ("win","xboxone","series-x","series-s","ps4--1","ps5") & involved_companies != null; 
      limit 100;`,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const platformDictionary = {
  win: 'PC',
  xboxone: 'XBOX ONE',
  'series-x': 'XBOX SERIES S/X',
  'ps4--1': 'PS4',
  ps5: 'PS5',
};

const mapData = async () => {
  const gamesData = await getData();
  return gamesData.map((game) => ({
    title: game.name,
    category: game.genres.map((game) => game.name).join(', '),
    description: game.summary,
    platform: game.platforms
      .filter((platform) => platformDictionary[platform.slug])
      .map((platform) => platformDictionary[platform.slug]),
    developer: game.involved_companies
      .filter((company) => company.developer)
      .map((developer) => developer.company.name)
      .join(', '),
    releaseDate:
      game.first_release_date && new Date(game.first_release_date * 1000),
    cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
    rating: 0,
    ratedBy: [],
  }));
};

app.post('/', async (req, res) => {
  try {
    const mappedGames = await mapData();
    await Game.create(mappedGames);
    res.send('Games successfully inserted into DB.');
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(3000, () =>
  console.log('Server running on http://localhost:3000...'),
);
