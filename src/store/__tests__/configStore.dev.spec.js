import { expect } from 'chai';
import configureStore from '../configStore.dev';

describe('configureStore.dev', () => {
  it('should return a store which conform redux store contract', () => {
    const store = configureStore();
    ['dispatch', 'subscribe', 'getState', 'replaceReducer'].forEach(method => {
      expect(store[method]).to.be.a('function');
    });
  });

  it('should return a store which support runSaga', () => {
    const store = configureStore();
    expect(store.runSaga).to.be.a('function');
  });

  it('should can assign preloadedState', () => {
    const auth = {
      currentUser: {
        email: 'test@example.com',
        type: 1,
      },
      authenticated: true,
      error: '',
    };
    const preloadedState = {
      auth,
    };
    const store = configureStore(preloadedState);
    expect(store.getState().auth).to.equal(auth);
  });
});
