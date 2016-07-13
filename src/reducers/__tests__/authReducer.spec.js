import { expect } from 'chai';

import reducer from '../authReducer';
import * as types from '../../actions/actionTypes';


const testActionTypes = [
  types.LOGIN_START,
  types.LOGIN_SUCCESS,
  types.LOGIN_FAIL,
  types.LOGOUT,
];

describe('reducers: auth', () => {
  it('should handle LOGOUT', () => {
    const initState = {
      authenticated: true,
    };
    const action = {
      type: types.LOGOUT,
    };
    const expectedState = {
      authenticated: false,
    };
    expect(reducer(initState, action)).to.eql(expectedState);
  });

  it('should handle LOGIN_FAIL', () => {
    const initState = {
      authenticated: false,
    };
    const error = new Error('login fail');
    const action = {
      type: types.LOGIN_FAIL,
      payload: error,
      error: true,
    };
    const expectedState = {
      authenticated: false,
      error,
    };
    expect(reducer(initState, action)).to.eql(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const initState = {
      authenticated: false,
    };
    const action = {
      type: types.LOGIN_SUCCESS,
    };
    const expectedState = {
      authenticated: true,
      error: '',
    };
    expect(reducer(initState, action)).to.eql(expectedState);
  });

  it('should return original state with other action types', () => {
    const initState = { authenticated: false, error: '' };
    Object.keys(types).forEach((item) => {
      if (testActionTypes.indexOf(item) === -1) {
        expect(reducer(initState,
          {
            type: item,
          }
        )).to.eql(initState);
      }
    });
    expect(reducer(initState,
      {
        type: 'RANDOM_ACTION',
      }
    )).to.eql(initState);
  });
});
