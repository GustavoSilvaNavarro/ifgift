import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';

import userRoutes from '../routes/user-routes/user-routes';
import { errorHandler } from '../middleware/errorHandler';

const app: Koa = new Koa();
const PORT = process.env.PORT || 8080;

app.use(koaBody());
app.use(cors());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

app.on('error', errorHandler);

export default { app, PORT };
