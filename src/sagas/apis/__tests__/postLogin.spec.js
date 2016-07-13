import 'isomorphic-fetch';

import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { createFetch, base } from 'http-client';
import * as baseFetcher from '../baseFetcher';
import { postLogin } from '../postLogin';


describe('auth API', () => {
  let _fetchAPI;

  before(() => {
    _fetchAPI = baseFetcher.fetchAPI;
    baseFetcher.fetchAPI = createFetch(
      baseFetcher.stack,
      base('http://test.domain.com')
    );
  });

  after(() => {
    baseFetcher.fetchAPI = _fetchAPI;
  });

  describe('#login', () => {
    const serverResponse = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ', // eslint-disable-line max-len
    };
    const loginFailServerResponse = 'Unauthorized';

    it('should throw when email is not a string', () => {
      expect(() => postLogin(null, 'password'))
        .to.throw(Error, /email should be a string/);
    });

    it('should throw when email is an empty string', () => {
      expect(() => postLogin('', 'password'))
        .to.throw(Error, /email should be a string/);
    });

    it('should throw when password is not a string', () => {
      expect(() => postLogin('test@example.com', null))
        .to.throw(Error, /password should be a string/);
    });

    it('should throw when password is an empty string', () => {
      expect(() => postLogin('test@example.com', ''))
        .to.throw(Error, /password should be a string/);
    });
    describe('login success', () => {
      beforeEach(() => {
        fetchMock
          .mock('http://test.domain.com/login', 'POST', {
            status: 200,
            body: serverResponse,
          });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should works when server response ok', async () => {
        const res = await postLogin('test@example.com', 'password');
        expect(fetchMock.called('http://test.domain.com/login')).to.equal(true);
        expect(fetchMock.calls().unmatched.length).to.equal(0);
        expect(res.status).to.equal(200);
        expect(JSON.parse(fetchMock.lastOptions('http://test.domain.com/login').body))
          .to.eql({
            email: 'test@example.com',
            password: 'password',
          });
        expect(res.jsonData).to.eql(serverResponse);
      });
    });

    describe('if login fail', () => {
      beforeEach(() => {
        fetchMock
          .mock('http://test.domain.com/login', 'POST', {
            status: 401,
            body: loginFailServerResponse,
          });
      });

      afterEach(() => {
        fetchMock.restore();
      });
    });
  });
});
