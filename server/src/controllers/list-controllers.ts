import { IList, IModifiedContextUser, IModifiedContextList } from '../types/app-types';
import { getListByUserId, insertNewItemToList, addToList, deleteList } from '../models/daos/list-daos';

export const retrieveAllListByUserId = async (ctx: IModifiedContextUser) => {
  try {
    const lists = await getListByUserId(ctx.params.userId);
    ctx.status = 200;
    ctx.body = lists;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const createNewList = async (ctx: IModifiedContextUser) => {
  try {
    const newList = await insertNewItemToList(ctx.params.userId);
    ctx.status = 201;
    ctx.body = newList;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const addItemToList = async (ctx: IModifiedContextList) => {
  try {
    const id = ctx.params.listId;
    const data = ctx.request.body as IList;
    const list = await addToList(id, data);
    ctx.status = 200;
    ctx.body = list;
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};

export const deleteSingleList = async (ctx: IModifiedContextList) => {
  try {
    const id = ctx.params.listId;
    const isDeleted = await deleteList(id); // returns the object that was deleted

    ctx.status = 200;
    ctx.body = isDeleted ? 'Deleted' : 'Not Deleted';
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', err, ctx);
  }
};
