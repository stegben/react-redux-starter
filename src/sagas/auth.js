import { take, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import {
  LOGIN_START,
  LOGOUT,
} from '../actions/actionTypes';

import {
  loginSuccess,
  loginFail,
  logout,
} from '../actions';

import {
  storeToken,
  clearToken,
  getToken,
} from '../utils/token';

import { postLogin } from './apis';

export function* loginFlow({ email, password }) {
  try {
    const token = yield call(postLogin, email, password);
    yield call(storeToken, token);
    yield put(loginSuccess());
    yield put(replace('/app'));
  } catch (error) {
    yield put(loginFail({ error }));
  }
}

export function* logoutFlow() {
  yield call(clearToken);
  yield put(logout());
  yield put(replace('/'));
}

export function* watchLogoutWhenTokenExists() {
  const token = yield call(getToken);
  if (token) {
    yield take(LOGOUT);
    yield call(logoutFlow);
  }
}

export function* watchAuthFlow() {
  while (true) {
    yield call(watchLogoutWhenTokenExists);
    const { payload } = yield take(LOGIN_START);
    yield call(loginFlow, payload);
  }
}
