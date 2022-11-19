import { Context } from 'koa';
import { retrieveAllUsers, insertNewUser, getUserData, updateUser } from '../models/daos/user-daos';
import { IUser } from '../types/app-types';

export const getAllUsers = async (ctx: Context) => {
  try {
    const listUsers = await retrieveAllUsers();
    ctx.body = listUsers;
    ctx.status = 200;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const addNewUser = async (ctx: Context) => {
  try {
    const data = ctx.request.body as { email: string };
    const newUser = await insertNewUser(data.email);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const getSingleUserInfo = async (ctx: Context) => {
  try {
    const token = ctx.request.header.authorization;
    if (token) {
      const userData = await getUserData(token);
      ctx.status = 200;
      ctx.body = userData;
    } else {
      ctx.status = 400;
      ctx.body = {
        message: 'Invalid Token',
        error: true,
      };
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const updateUserInfo = async (ctx: Context) => {
  try {
    const email = ctx.params.userEmail as string;
    const data = ctx.request.body as IUser;
    const updatedInfo = await updateUser(email, data);

    ctx.status = 200;
    ctx.body = updatedInfo;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};
