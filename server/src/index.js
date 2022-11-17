import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import router from './router.js';

const app = new Koa();
const PORT = process.env.PORT || 8080;

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`legacy project`);
});
