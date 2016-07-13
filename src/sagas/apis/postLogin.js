import { fetchAPI } from './baseFetcher';
import invariant from 'invariant';

export const postLogin = (email, password) => {
  invariant(
    email && typeof email === 'string',
    'email should be a string'
  );
  invariant(
    password && typeof password === 'string',
    'password should be a string'
  );
  return fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
