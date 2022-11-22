import { isValidObjectId } from 'mongoose';
import ListModel from '../schemas/list-schema';

import { IList } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const getListByUserId = async (userId: string) => {
  if (isValidObjectId(userId)) {
    const allLists = await ListModel.find({ createdBy: userId });

    return allLists;
  }

  throw new AppErrors({ message: 'Credential Invalid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const insertNewItemToList = async (userId: string) => {
  if (isValidObjectId(userId)) {
    const newList = new ListModel({ createdBy: userId });
    await newList.save();
    return newList;
  }
  throw new AppErrors({ message: 'Credential Invalid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const addToList = async (listId: string, data: IList) => {
  if (isValidObjectId(listId) && data) {
    const listExist = await ListModel.findOne({ _id: listId });

    if (listExist && data.text && data.title) {
      Object.assign(listExist, data);
      await listExist.save();
      return listExist;
    }
    throw new AppErrors({ message: 'List not found', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
  }
  throw new AppErrors({ message: 'Credential Invalid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const deleteList = async (listId: string) => {
  if (isValidObjectId(listId)) {
    const deletedList = await ListModel.findOneAndDelete({ id: listId });

    // console.log(deletedList);
    if (deletedList) return deletedList;

    throw new AppErrors({ message: 'List not found', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
  }

  throw new AppErrors({ message: 'Credential Invalid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};
