import jwt from 'jsonwebtoken';
import env from '../utils/utils';

export const checkValidEmail = (email: string): boolean => {
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) return true;
  return false;
};

export const signToken = (idUser: string, email: string): string => {
  const token = jwt.sign({ id: idUser, email: email }, env.secretKeyJWT, { expiresIn: '1hr' });

  return token;
};
