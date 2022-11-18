import { Context } from 'koa';
import { AppErrors } from '../helpers/app-error';

export const errorHandler = (err: AppErrors, ctx: Context) => {
  ctx.status = err.status || 500;
  ctx.body = {
    name: err.name || 'Error',
    message: err.message || err.description,
    status: err.status || 500,
    trace: err.stack || err.trace || 'Stack not available',
    code: err.code || -1,
    error: err.error || true,
  };
};
