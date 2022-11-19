import 'dotenv/config';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import Koa from 'koa';
import koaBody from 'koa-body';
import supertest from 'supertest';
import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

import userRoutes from '../src/routes/user-routes/user-routes';
import UserModel from '../src/models/schemas/user-schemas';
import { signToken } from '../src/helpers/helper-functions';
import { AppErrors } from '../src/helpers/app-error';

const emailMocks = { email1: 'test@test.com', email2: 'mike_smith@codeworks.com', email3: 'hello', email4: 'robot@robot.com' };
const userInfoMock = {
  email: 'test@test.com',
  address: '107 Main Street, LA',
  birthday: new Date(),
  name: faker.name.firstName(),
  pronouns: faker.name.middleName(),
  lastName: faker.name.lastName(),
};
const db = 'test';

describe('Integration tests for Backend User Route', () => {
  const app: Koa = new Koa();
  app.use(koaBody());
  app.use(userRoutes.routes());
  const request = supertest(app.callback());

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/${db}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Post /user', () => {
    test('Should return user and status 201', async () => {
      const email = faker.internet.email();
      const res = await request.post('/user').send({ email });

      const user = await UserModel.findOne({ email });

      expect(res.statusCode).toBe(201)
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.newUser._id).toBeDefined();
      if (user) {
        expect(user.email).toBe(res.body.newUser.email);
      }
    });

    test('Should return status code 400 and throw an error when email is invalid', async () => {
      const email = 'hello';
      try {
        await request.post('/user').send({ email });
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Email not valid/);
        expect((err as AppErrors).status).toBe(400);
      }
    });
  });

  describe('GET /user', () => {
    test('Retrieve all users', async () => {
      await UserModel.insertMany([
        { email: emailMocks.email1 },
        { email: emailMocks.email2 },
        { email: emailMocks.email4 }
      ]);

      const res = await request.get('/user');

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.length).toBe(3);
      expect(res.body[0].email).toBe(emailMocks.email1)
      expect(res.body[1].email).toBe(emailMocks.email2)
      expect(res.body[2].email).toBe(emailMocks.email4)
    });

    test('Should receive an empty array when there is no users', async () => {
      const res = await request.get('/user');

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /single-user', () => {
    test('Should retrieve one user info', async () => {
      const userInserted = await UserModel.create({ email: faker.internet.email() });
      const token = signToken(userInserted.id, userInserted.email);

      const res = await request.get('/single-user').set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.email).toBe(userInserted.email);
    });

    test('Should return 400 and invalid token', async () => {
      const res = await request.get('/single-user');

      expect(res.statusCode).toBe(400);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.message).toMatch(/Invalid Token/);
      expect(res.body.error).toBe(true);
    });
  });

  describe('PUT /user/:userEmail', () => {
    test('Should update user info', async () => {
      const user = await UserModel.create({ email: userInfoMock.email });

      const res = await request.put(`/user/${userInfoMock.email}`).send(userInfoMock);

      expect(res.body.address).toMatch(userInfoMock.address);
      expect(res.body.name).toMatch(userInfoMock.name);
      expect(res.body.pronouns).toMatch(userInfoMock.pronouns);
      expect(res.body.email).toBe(user.email);
    });

    test('Throw an Error when a user is not registered', async () => {
      try {
        await request.put('/user/test@test.com').send(userInfoMock);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/User does not exist/);
      }
    });

    test('Throw an Error when email is Invalid', async () => {
      try {
        await request.put('/user/hello').send(userInfoMock);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Email not valid/);
      }
    });
  });
});