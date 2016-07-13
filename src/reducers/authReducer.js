import * as types from '../actions/actionTypes';
import { getToken } from '../utils/token';

const token = getToken();
export const initAuthState = token ? {
  authenticated: true,
  error: '',
} : {
  authenticated: false,
  error: '',
};

const authReducer = (state = initAuthState, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return { ...state, authenticated: false };
    case types.LOGIN_SUCCESS:
      return { ...state, authenticated: true, error: '' };
    case types.LOGIN_FAIL:
      return { ...state, authenticated: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
