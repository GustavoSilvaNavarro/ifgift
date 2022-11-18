import { Types } from 'mongoose';

export interface IUser {
  email: string;
  name?: string;
  pronouns?: string;
  address?: string;
  birthday?: Date;
  userName?: string;
}

export interface IList {
  createdBy: Types.ObjectId;
  title?: string;
  recipient?: string;
  text?: string;
}

export interface IMyToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
