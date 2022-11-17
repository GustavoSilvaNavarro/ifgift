import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import userRoutes from '../routes/user-routes/user-routes';

const app: Koa = new Koa();
const PORT = process.env.PORT || 8080;

app.use(bodyParser());
app.use(cors());
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

export default { app, PORT };
