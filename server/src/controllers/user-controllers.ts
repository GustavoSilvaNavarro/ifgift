import { Context } from 'koa';
import { retrieveAllUsers } from '../models/daos/user-daos';

export const getAllUsers = async (ctx: Context) => {
  try {
    const listUsers = await retrieveAllUsers();
    ctx.body = listUsers;
    ctx.status = 200;
  } catch (err) {
    console.error(err);
  }
};
