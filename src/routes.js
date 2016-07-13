import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  NotFound,
  Landing,
  App,
} from './pages';

const createShouldAuth = (store) =>
  (nextState, replace, cb) => {
    const state = store.getState();
    if (!state.auth.authenticated) {
      replace('/');
    }
    cb();
  };


const createRoutes = (store) => {
  const shouldAuth = createShouldAuth(store);
  return (
    <Route path="/">
      <IndexRoute component={Landing} />
      <Route path="app" component={App} onEnter={shouldAuth} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};

export default createRoutes;
