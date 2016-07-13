import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { getToken, storeToken, clearToken } from '../token';


describe('utils: ', () => {
  describe('token', () => {
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'; // eslint-disable-line max-len

    describe('#getToken', () => {
      beforeEach(() => {
        stub(window.localStorage, 'getItem');
      });

      afterEach(() => {
        window.localStorage.getItem.restore();
      });

      it('should get the token back', () => {
        window.localStorage.getItem.returns(TOKEN);
        expect(getToken()).to.equal(TOKEN);
      });
    });

    describe('#storeToken', () => {
      beforeEach(() => {
        spy(window.localStorage, 'setItem');
      });

      afterEach(() => {
        window.localStorage.setItem.restore();
      });

      it('should put the token into storage', () => {
        storeToken(TOKEN);
        expect(window.localStorage.setItem).to.have.been.calledWith('token', TOKEN);
      });
    });

    describe('#clearToken', () => {
      beforeEach(() => {
        spy(window.localStorage, 'removeItem');
      });

      afterEach(() => {
        window.localStorage.removeItem.restore();
      });

      it('should remove the token from storage', () => {
        clearToken();
        expect(window.localStorage.removeItem).to.have.been.calledWith('token');
      });
    });
  });
});
