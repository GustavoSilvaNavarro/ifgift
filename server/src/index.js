import Koa from 'koa';
import cors from '@koa/cors';

import router from './router.js';

const app = new Koa();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Koa Server working on Port: ${PORT} - Worker: ${process.pid}`);
});
