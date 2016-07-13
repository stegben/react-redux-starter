import 'isomorphic-fetch';
import { createStack, createFetch, init, accept, header, parseJSON } from 'http-client';

const middlewares = [
  init('credentials', 'same-origin'),
  accept('application/json'),
  header('Content-Type', 'application/json'),
  parseJSON(),
];

if (process.env.NODE_ENV === 'development') {
  const { log } = require('http-client-debug'); // eslint-disable-line global-require
  middlewares.push(log());
}

export const stack = createStack(...middlewares);

export const fetchAPI = createFetch(stack);
