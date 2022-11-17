import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://Gustavo_Silva:sessionsAndCookiesClass@firsttry.dpuwp.mongodb.net/gifts_db?retryWrites=true&w=majority'
  )
  .then(
    () => {
      console.log('Database is connected.');
    },
    err => {
      console.error(err);
    }
  );

export default mongoose;
