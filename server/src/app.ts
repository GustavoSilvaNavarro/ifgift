import 'dotenv/config';
import serverConnection from './server/server';
import { connectDb } from './models/connectionDb';

const { app, PORT } = serverConnection;
connectDb();

app.listen(PORT, () => {
  console.log(`Koa Server working on Port: ${PORT} - Worker: ${process.pid}`);
});
