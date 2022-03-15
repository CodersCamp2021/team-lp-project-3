import fetch from 'node-fetch';

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
      where hypes > 50; 
      limit 30;`,
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
  'series-s': 'XBOX SERIES S/X',
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
    console.log(data[0].name);
    return data[0].name;
  } catch (error) {
    return '';
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
          .map((platform) => platformDictionary[platform.slug])
          .join(', '),
        developer: (
          await Promise.all(
            game.involved_companies
              .filter((company) => company.developer)
              .map(({ company }) => getCompanyName(company)),
          )
        ).join(', '),
        releaseDate:
          game.first_release_date && new Date(game.first_release_date * 1000),
        rating: 0,
        ratedBy: [],
      };
    }),
  );

  console.log(mappedGames);
};

mapData();
