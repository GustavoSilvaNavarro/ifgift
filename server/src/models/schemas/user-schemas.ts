import { Schema, model } from 'mongoose';

import { IUser } from '../../types/app-types';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    pronouns: { type: String, trim: true },
    address: { type: String, trim: true },
    birthday: { type: Date },
    userName: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('User', UserSchema);
