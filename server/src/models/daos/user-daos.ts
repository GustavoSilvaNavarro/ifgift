import jwt from 'jsonwebtoken';

import UserModel from '../schemas/user-schemas';
import env from '../../utils/utils';
import { checkValidEmail, signToken } from '../../helpers/helper-functions';
import { IMyToken, IUser } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const retrieveAllUsers = async () => {
  const allUsers = await UserModel.find({});

  return allUsers;
};

export const insertNewUser = async (email: string) => {
  if (checkValidEmail(email)) {
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      const newUser = new UserModel({ email });
      await newUser.save();

      const token = signToken(newUser.id, email);

      return { newUser, token };
    }

    return { userExist, token: signToken(userExist.id, email) };
  }

  throw new AppErrors({ message: 'Email not valid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const getUserData = async (token: string) => {
  if (token) {
    const possibleUser = jwt.verify(token.split(' ')[1], env.secretKeyJWT) as IMyToken;

    const user = await UserModel.findById(possibleUser.id);

    if (user) return user;
  }

  throw new AppErrors({ message: 'Credentials Invalid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const updateUser = async (userEmail: string, data: IUser) => {
  const { email, ...rest } = data;
  if (checkValidEmail(userEmail) && email && email === userEmail) {
    const user = await UserModel.findOne({ email: userEmail });

    if (user) {
      Object.assign(user, rest);
      await user.save();
      return user;
    }

    throw new AppErrors({ message: 'User does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
  }

  throw new AppErrors({ message: 'Email not valid', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};
