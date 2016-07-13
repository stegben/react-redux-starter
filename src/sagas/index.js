import { fork } from 'redux-saga/effects';

import { watchAuthFlow } from './auth';

export default function* rootSaga() {
  yield [
    fork(watchAuthFlow),
  ];
}
