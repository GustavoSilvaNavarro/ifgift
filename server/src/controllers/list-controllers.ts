import { Context } from 'koa';

import { IList } from '../types/app-types';
import { getListByUserId, insertNewItemToList, addToList, deleteList } from '../models/daos/list-daos';

export const retrieveAllListByUserId = async (ctx: Context) => {
  try {
    const lists = await getListByUserId(ctx.params.userId as string);
    ctx.status = 200;
    ctx.body = lists;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const createNewList = async (ctx: Context) => {
  try {
    const newList = await insertNewItemToList(ctx.params.userId as string);
    ctx.status = 201;
    ctx.body = newList;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const addItemToList = async (ctx: Context) => {
  try {
    const id = ctx.params.listId as string;
    const data = ctx.request.body as IList;
    const list = await addToList(id, data);
    ctx.status = 200;
    ctx.body = list;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const deleteSingleList = async (ctx: Context) => {
  try {
    const id = ctx.params.listId as string;
    const isDeleted = await deleteList(id); // returns the object that was deleted

    ctx.status = 200;
    ctx.body = isDeleted ? 'Deleted' : 'Not Deleted';
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};
