import 'dotenv/config';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

import { insertNewUser, retrieveAllUsers, getUserData, updateUser } from '../src/models/daos/user-daos';
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

describe('Unit tests for Backend User Route', () => {
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

  describe('Insert User to DB', () => {
    test('Should insert new user to db or throw an Error', async () => {
      const userEmail = 'test@test.com';
      await insertNewUser(userEmail);

      const user = await UserModel.findOne({ email: userEmail });

      if (user) {
        expect(user.email).toBe(userEmail);
      }
    });

    test('If email is invalid should throw an error', async () => {
      const userEmail = 'hello';

      try {
        await insertNewUser(userEmail);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
      }
    });
  });

  describe('Retrieving user from DB', () => {
    test('Retrieve all users', async () => {
      await UserModel.insertMany([
        { email: emailMocks.email1 },
        { email: emailMocks.email2 },
        { email: emailMocks.email4 }
      ]);

      const allUsers = await retrieveAllUsers();

      expect(allUsers.length).toBe(3);
      expect(allUsers[0].email).toBe(emailMocks.email1)
    });

    test('List of Users should be empty if there is no user registered', async () => {
      const allUsers = await retrieveAllUsers();
      expect(allUsers.length).toBe(0);
    });
  });

  describe('Get Single User Data', () => {
    test('Should get user data profile', async () => {
      const userInserted = await UserModel.create({ email: faker.internet.email('test', 'Smith') });
      const token = signToken(userInserted.id, userInserted.email);

      const user = await getUserData(`Bearer ${token}`);

      expect(user.email).toBe(userInserted.email);
    });

    test('If token does not exist or it is invalid throw error', async () => {
      try {
        await getUserData('');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
      }
    });
  });

  describe('Unit tests for update user', () => {
    test('Throw an Error when email is Invalid', async () => {
      try {
        await updateUser('hello', userInfoMock);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Email not valid/);
      }
    });

    test('Throw an Error when a user is not registered', async () => {
      try {
        await updateUser('test@test.com', userInfoMock);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/User does not exist/);
      }
    });

    test('Should update User info', async () => {
      const insertUser = await UserModel.create({ email: userInfoMock.email });

      const userInfo = await updateUser(userInfoMock.email, userInfoMock);

      expect(userInfo.address).toMatch(userInfoMock.address);
      expect(userInfo.name).toMatch(userInfoMock.name);
      expect(userInfo.pronouns).toMatch(userInfoMock.pronouns);
      expect(insertUser.email).toBe(userInfo.email);
    });
  });

})