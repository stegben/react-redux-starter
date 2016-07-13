import { expect } from 'chai';
import { call, put, take } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import {
  watchAuthFlow,
  watchLogoutWhenTokenExists,
  logoutFlow,
  loginFlow,
} from '../auth';

import { postLogin } from '../apis';

import {
  LOGIN_START,
  LOGOUT,
} from '../../actions/actionTypes';

import {
  loginSuccess,
  loginFail,
  logout,
} from '../../actions';

import {
  storeToken,
  clearToken,
  getToken,
} from '../../utils/token';


describe('sagas: auth', () => {
  const email = '123@example.com';
  const password = 'pwd';
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'; // eslint-disable-line max-len

  describe('watchAuthFlow', () => {
    it('should call watchLogoutWhenTokenExists when first initialized', () => {
      const iterator = watchAuthFlow();
      expect(iterator.next().value).to.eql(call(watchLogoutWhenTokenExists));
    });

    it('should take LOGIN_START action after watchLogoutWhenTokenExists', () => {
      const iterator = watchAuthFlow();
      iterator.next();
      expect(iterator.next().value).to.eql(take(LOGIN_START));
    });

    it('should call loginFlow after take LOGIN_START action', () => {
      const iterator = watchAuthFlow();
      const loginAction = { type: LOGIN_START, payload: { email, password } };
      iterator.next();
      iterator.next();
      expect(iterator.next(loginAction).value).to.eql(call(loginFlow, { email, password }));
    });

    it('should call watchLogoutWhenTokenExists again', () => {
      const iterator = watchAuthFlow();
      const loginAction = { type: LOGIN_START, payload: { email, password } };
      iterator.next();
      iterator.next();
      iterator.next(loginAction);
      expect(iterator.next().value).to.eql(call(watchLogoutWhenTokenExists));
    });
  });

  describe('watchLogoutWhenTokenExists', () => {
    it('should call getToken', () => {
      const iterator = watchLogoutWhenTokenExists();
      expect(iterator.next().value).to.eql(call(getToken));
    });

    it('should do nothing if no token get', () => {
      const iterator = watchLogoutWhenTokenExists();
      iterator.next();
      expect(iterator.next(undefined).done).to.equal(true);
    });

    it('should call take(LOGOUT) if got token', () => {
      const iterator = watchLogoutWhenTokenExists();
      iterator.next();
      expect(iterator.next(TOKEN).value).to.eql(take(LOGOUT));
    });

    it('should call call logoutFlow if got token after take LOGOUT action', () => {
      const iterator = watchLogoutWhenTokenExists();
      iterator.next();
      iterator.next(TOKEN);
      expect(iterator.next().value).to.eql(call(logoutFlow));
    });
  });

  describe('logoutFlow', () => {
    it('should call clearToken first', () => {
      const iterator = logoutFlow();
      expect(iterator.next().value).to.eql(call(clearToken));
    });

    it('should then put LOGOUT action', () => {
      const iterator = logoutFlow();
      iterator.next();
      expect(iterator.next().value).to.eql(put(logout()));
    });

    it('should then redirect route to root through react-router-redux', () => {
      const iterator = logoutFlow();
      iterator.next();
      iterator.next();
      expect(iterator.next().value).to.eql(put(replace('/')));
    });
  });

  describe('loginFlow', () => {
    it('should call login api first', () => {
      const iterator = loginFlow({ email, password });
      expect(iterator.next().value).to.eql(call(postLogin, email, password));
    });

    it('should call store token after that', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      expect(iterator.next(TOKEN).value).to.eql(call(storeToken, TOKEN));
    });

    it('should put login success action finally', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      iterator.next(TOKEN);
      expect(iterator.next().value).to.eql(put(loginSuccess()));
    });

    it('should redirect to /app', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      iterator.next(TOKEN);
      iterator.next();
      expect(iterator.next().value).to.eql(put(replace('/app')));
    });

    it('should handle error when call login api', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      const error = new Error('some error');
      expect(iterator.throw(error).value).to.eql(put(loginFail({ error })));
    });

    it('should handle error when store token', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      iterator.next(TOKEN);
      const error = new Error('some error');
      expect(iterator.throw(error).value).to.eql(put(loginFail({ error })));
    });

    it('should handle error when put login sucess action', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      iterator.next(TOKEN);
      iterator.next();
      const error = new Error('some error');
      expect(iterator.throw(error).value).to.eql(put(loginFail({ error })));
    });

    it('should handle error when redirect', () => {
      const iterator = loginFlow({ email, password });
      iterator.next();
      iterator.next(TOKEN);
      iterator.next();
      iterator.next();
      const error = new Error('some error');
      expect(iterator.throw(error).value).to.eql(put(loginFail({ error })));
    });
  });
});
