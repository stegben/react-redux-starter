import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createRoute from './routes';
import configStore from './store';
import rootSaga from './sagas';

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoute(store);
store.runSaga(rootSaga);

render(
  (
  <Provider store={store} >
    <Router history={history} routes={routes} />
  </Provider>
  ), document.getElementById('root')
);
