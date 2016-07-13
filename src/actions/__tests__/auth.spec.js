import { expect } from 'chai';
import * as types from '../actionTypes';
import * as actions from '../auth';


describe('actions: ', () => {
  describe('auth', () => {
    it('loginStart should create LOGIN_START action', () => {
      const user = {
        email: 'test@example.com',
        password: '1qaz2wsx',
      };
      expect(actions.loginStart(user)).to.deep.equal({
        type: types.LOGIN_START,
        payload: {
          email: user.email,
          password: user.password,
        },
      });
    });

    it('loginSuccess should create LOGIN_SUCCESS action', () => {
      expect(actions.loginSuccess()).to.deep.equal({
        type: types.LOGIN_SUCCESS,
      });
    });

    it('loginFail should create LOGIN_FAIL action', () => {
      const error = new Error('login failed');
      expect(actions.loginFail({ error })).to.deep.equal({
        type: types.LOGIN_FAIL,
        error: true,
        payload: error,
      });
    });

    it('logout should create LOGOUT action', () => {
      expect(actions.logout()).to.deep.equal({ type: types.LOGOUT });
    });
  });
});
