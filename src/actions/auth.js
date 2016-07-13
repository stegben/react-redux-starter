/*
 * auth action creators
 *
 */

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './actionTypes';

export const loginStart = ({ email, password }) => ({
  type: LOGIN_START,
  payload: {
    email,
    password,
  },
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFail = ({ error }) => ({
  type: LOGIN_FAIL,
  error: true,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});
