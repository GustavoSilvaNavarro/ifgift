import 'dotenv/config';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import Koa from 'koa';
import koaBody from 'koa-body';
import supertest from 'supertest';
import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

import listRoutes from '../src/routes/list-routes/list-routes';
import UserModel from '../src/models/schemas/user-schemas';
import ListModel from '../src/models/schemas/list-schema';
import { AppErrors } from '../src/helpers/app-error';

const db = 'test';

describe('Integration Tests for List Routes', () => {
  const app: Koa = new Koa();
  app.use(koaBody());
  app.use(listRoutes.routes());
  const request = supertest(app.callback());

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/${db}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await ListModel.deleteMany();
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /list/:userId', () => {
    test('Should successfully create a new empty List', async () => {
      const user = await UserModel.create({ email: faker.internet.email() });

      const res = await request.post(`/list/${user.id}`);

      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.createdBy).toBe(user.id);
      expect(res.body.title).toBeUndefined();
      expect(res.body.text).toBeUndefined();
      expect(res.body.items.length).toBe(0);
    });

    test('Throw and error when id is not valid', async () => {
      try {
        await request.post('/list/invalidId');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Credential Invalid/);
        expect((err as AppErrors).status).toBe(400);
      }
    });
  });

  describe('GET /list/:userId', () => {
    test('Should retrieve array of lists', async () => {
      const newUser = await UserModel.create({ email: faker.internet.email() });

      const res = request.post(`/list/${newUser.id}`);
      const res1 = request.post(`/list/${newUser.id}`);

      const [response, response1] = await Promise.all([res, res1]);

      const lists = await request.get(`/list/${newUser.id}`);

      expect(lists.statusCode).toBe(200);
      expect(lists.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(lists.body.length).toBe(2);
      expect(response.body.createdBy).toBe(newUser.id);
      expect(response.statusCode).toBe(201);
      expect(response1.statusCode).toBe(201);
      expect(response1.body.createdBy).toBe(newUser.id);
    });

    test('Should throw and error when Id is invalid', async () => {
      try {
        await request.get('/list/invalidId');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Credential Invalid/);
        expect((err as AppErrors).status).toBe(400);
      }
    });
  });

  describe('PUT /list/:listId', () => {
    test('Should update item list', async () => {
      const user = await UserModel.create({ email: faker.internet.email() });
      const list = await ListModel.create({ createdBy: user.id });

      const mockListData = {
        createdBy: user.id,
        title: faker.lorem.sentence(2),
        text: faker.lorem.sentence(10),
        recipient: faker.internet.userName(),
      }

      const res = await request.put(`/list/${list.id}`).send(mockListData);

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.createdBy).toBe(mockListData.createdBy);
      expect(res.body.title).toMatch(mockListData.title);
      expect(res.body.text).toMatch(mockListData.text);
    });

    test('Should throw and error when Id is invalid', async () => {
      try {
        await request.put('/list/hello123');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Credential Invalid/);
        expect((err as AppErrors).status).toBe(400);
      }
    });

    test('Should throw and error when Id is invalid', async () => {
      try {
        const user = await UserModel.create({ email: faker.internet.email() });
        const mockListData = {
          createdBy: user.id,
          title: faker.lorem.sentence(2),
          text: faker.lorem.sentence(10),
          recipient: faker.internet.userName(),
        }
        await request.put(`/list/${user.id}`).send(mockListData);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/List not found/);
        expect((err as AppErrors).status).toBe(400);
      }
    });
  });

  describe('DELETE /list/:listId', () => {
    test('Should delete a list', async () => {
      const user = await UserModel.create({ email: faker.internet.email() });
      const list = await ListModel.create({ createdBy: user.id });

      const res = await request.del(`/list/${list.id}`);
      const isDeleted = await ListModel.findOne({ id: list.id });

      expect(res.statusCode).toBe(200);
      expect(res.text).toMatch(/Deleted/);
      expect(isDeleted).toBeNull();
    });

    test('Should throw and error when Id is invalid', async () => {
      try {
        await request.del('/list/hello123');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Credential Invalid/);
        expect((err as AppErrors).status).toBe(400);
      }
    });

    test('Should throw and error when Id is invalid', async () => {
      try {
        const user = await UserModel.create({ email: faker.internet.email() });
        await request.del(`/list/${user.id}`);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/List not found/);
        expect((err as AppErrors).status).toBe(400);
      }
    });
  });
});