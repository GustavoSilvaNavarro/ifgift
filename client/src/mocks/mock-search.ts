import { rest } from 'msw';
import { env } from '../helpers/env';
import { arrayOfUsers, userInfo, listsMocks, list, listsMocksUpdated } from './listMocks';

export const handlers = [
  rest.get(`${env.baseUrl}/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(arrayOfUsers));
  }),

  rest.get(`${env.baseUrl}/list/${userInfo._id}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listsMocks));
  }),

  rest.post(`${env.baseUrl}/list/${userInfo._id}`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(list));
  }),

  rest.put(`${env.baseUrl}/list/${list._id}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listsMocksUpdated[3]));
  }),

  rest.delete(`${env.baseUrl}/list/${list._id}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.text('Deleted'));
  }),
];
