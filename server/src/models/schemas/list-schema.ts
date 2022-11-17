import { Schema, model } from 'mongoose';
import { IList } from '../../types/app-types';

const ListSchema = new Schema<IList>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, trim: true },
    recipient: { type: String, trim: true },
    text: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export default model<IList>('List', ListSchema);
