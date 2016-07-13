import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  logger,
];

const enhancer = compose(
  applyMiddleware(...middlewares),
);

export default function configStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer,
  );

  store.runSaga = sagaMiddleware.run;

  return store;
}
