import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app.js';
import dotenv from 'dotenv';

dotenv.config();

describe('register', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_PASSWORD, {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.close();
  });

  it('should register new user with correct data', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      secondName: 'secondname',
      username: 'username',
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(201);
  });

  it('should NOT register new user with the same data as existing', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      secondName: 'secondname',
      username: 'username',
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should NOT register new user with uncomplete data', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      secondName: 'secondname',
      username: 'username',
      //no email here
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
  });
});
