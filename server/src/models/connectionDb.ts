import mongoose from 'mongoose';

import env from '../utils/utils';

export const connectDb = async (): Promise<void> => {
  try {
    const db = await mongoose.connect(env.dbURL);
    console.log(`DB is connected to ${db.connection.db.databaseName}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
