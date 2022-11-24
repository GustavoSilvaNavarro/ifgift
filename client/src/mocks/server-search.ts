import { setupServer } from 'msw/node';
import { handlers } from './mock-search';

export const server = setupServer(...handlers);
