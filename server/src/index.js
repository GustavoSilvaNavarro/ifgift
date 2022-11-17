import Koa from 'koa';
const app = new Koa();
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import config from './config';
import router from './router';

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(config.PORT, () => {
  console.log(`Server kickin it at http://localhost:${config.PORT}`);
});
