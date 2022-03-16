import fetch from 'node-fetch';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from '../models/game.js';

const app = express();
dotenv.config();

// DB setup
mongoose.connect(process.env.DATABASE_PASSWORD, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// allow express get json in request body
app.use(express.json());

const gamesURL = 'https://api.igdb.com/v4/games/';
const companiesURL = 'https://api.igdb.com/v4/companies/';

const getData = async () => {
  try {
    const response = await fetch(gamesURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': 'dik3ye3ha5u1ktuy09lfi3zx7o9get',
        Authorization: 'Bearer igeghv2icfol7htbx96k82c2w0rfh7',
      },
      body: `fields name, genres.name, summary, platforms.slug, involved_companies.developer, involved_companies.company, first_release_date, cover.url; 
      where hypes > 50 & platforms.slug = ("win","xboxone","series-x","series-s","ps4--1","ps5"); 
      limit 40;`,
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

const getCompanyName = async (companyId) => {
  try {
    const response = await fetch(companiesURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': 'dik3ye3ha5u1ktuy09lfi3zx7o9get',
        Authorization: 'Bearer igeghv2icfol7htbx96k82c2w0rfh7',
      },
      body: `fields *;
      where id = ${companyId};`,
    });
    const data = await response.json();
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data[0].name);
        return resolve(data[0].name);
      }, 250);
    });
    return data[0].name;
  } catch (error) {
    console.log(error);
  }
};

const mapData = async () => {
  const gamesData = await getData();
  const mappedGames = await Promise.all(
    gamesData.map(async (game) => {
      return {
        title: game.name,
        category: game.genres.map((game) => game.name).join(', '),
        description: game.summary,
        platform: game.platforms
          .filter((platform) => platformDictionary[platform.slug])
          .map((platform) => platformDictionary[platform.slug]),
        developer: (
          await Promise.all(
            game.involved_companies
              .filter((company) => company.developer)
              .map(async ({ company }) => await getCompanyName(company)),
          )
        ).join(', '),
        releaseDate: game.first_release_date
          ? new Date(game.first_release_date * 1000)
          : new Date('9999'),
        rating: 0,
        ratedBy: [],
      };
    }),
  );
  return mappedGames;
};

app.post('/', async (req, res) => {
  try {
    const mappedGames = await mapData();
    await Game.create(mappedGames);
    res.send('Ok');
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(3000, () =>
  console.log('Server running on http://localhost:3000...'),
);
