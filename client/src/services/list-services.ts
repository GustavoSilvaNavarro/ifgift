import { env } from '../helpers/env';
import { IList } from '../types/app-types';

export const getListsByUserId = async (userId: string) => {
  try {
    const result = await fetch(`${env.baseUrl}/list/${userId}`, {
      method: 'GET',
      mode: 'cors',
    });
    return (await result.json()) as unknown as Array<IList>;
  } catch (err) {
    console.error(err);
  }
};

export const addToMyLists = async (userId: string) => {
  try {
    const result = await fetch(`${env.baseUrl}/list/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return (await result.json()) as unknown as IList;
  } catch (err) {
    console.error(err);
  }
};

export const updateList = async (listId: string, list: IList) => {
  try {
    const result = await fetch(`${env.baseUrl}/list/${listId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    });
    return (await result.json()) as unknown as IList;
  } catch (err) {
    console.error(err);
  }
};

export const deleteList = async (listId: string) => {
  try {
    const data = await fetch(`${env.baseUrl}/list/${listId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return await data.text();
  } catch (error) {
    console.error(error);
  }
};
