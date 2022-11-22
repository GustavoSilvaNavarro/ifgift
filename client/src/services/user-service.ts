import { env } from '../helpers/env';
import { IUser } from '../types/app-types';

export const getAllUsers = async () => {
  try {
    const result = await fetch(`${env.baseUrl}/user`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = (await result.json()) as unknown as Array<IUser>;
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const result = await fetch(`${env.baseUrl}/single-user`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const user = (await result.json()) as unknown as IUser;
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const addUser = async (user: { email: string }) => {
  try {
    const result = await fetch(`${env.baseUrl}/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return (await result.json()) as unknown as { userExist: IUser; token: string };
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (user: IUser) => {
  try {
    const result = await fetch(`${env.baseUrl}/user/${user.email}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return (await result.json()) as unknown as IUser;
  } catch (err) {
    console.error(err);
  }
};
