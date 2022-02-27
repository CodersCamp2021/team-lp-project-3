import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Checks if game updates correctly', () => {
  // beforeAll(async () => {
  //   await mongoose.connect(process.env.DATABASE_PASSWORD, {
  //     newUrlParser: true,
  //   });
  // });
  // afterAll(async () => {
  //   await mongoose.connection.db.dropCollection('games');
  //   await mongoose.connection.close();
  // });
  // it('should update existing user', async () => {
  //   const post = await request(app).post('/').send({
  //     title: 'CS:GO',
  //     category: 'Shooter',
  //     description: 'FPS game',
  //     platform: 'PC',
  //     developer: 'Valve',
  //     releaseDate: '2015',
  //   });
  //     console.log(post.body);
  //     const update = await request(app).put(`/${post.body._id}`)
  //   });
});
