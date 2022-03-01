import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app.js';
import dotenv from 'dotenv';

dotenv.config();

describe('register feature tests', () => {
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
      lastName: 'lastname',
      username: 'username',
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.firstName).toBe('firstname');
    expect(response.body.lastName).toBe('lastName');
    expect(response.body.username).toBe('username');
    expect(response.body.email).toBe('randomemail@test.com');
    expect(response.body.type).toBe('user');
    expect(response.body.ratings).toStrictEqual([]);
  });

  it('should NOT register new user with the same data as existing', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      errors: [
        {
          value: 'username',
          msg: 'Username already in user',
          param: 'username',
          location: 'body',
        },
        {
          value: 'randomemail@test.com',
          msg: 'E-mail already in user',
          param: 'email',
          location: 'body',
        },
      ],
    });
  });

  it('should NOT register new user without firstname', async () => {
    const response = await request(app).post('/register/').send({
      // no first name
      lastName: 'lastname',
      username: 'username',
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should NOT register new user without lastName', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      // no second name
      username: 'username',
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should NOT register new user without username', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      lastName: 'lastname',
      // no username
      email: 'randomemail@test.com',
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should NOT register new user without email', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      // no email
      password: 'password1234',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should NOT register new user without password', async () => {
    const response = await request(app).post('/register/').send({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      email: 'randomemail@test.com',
      // no password
    });

    expect(response.statusCode).toBe(400);
  });
});
