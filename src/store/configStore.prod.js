import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
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
