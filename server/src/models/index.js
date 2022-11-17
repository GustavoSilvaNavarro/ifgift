import mongoose from 'mongoose';

import env from '../utils/env.js';

mongoose.connect(env.dbURL).then(
  () => {
    console.log('Database is connected.');
  },
  err => {
    console.error(err);
  }
);

export default mongoose;
