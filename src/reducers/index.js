import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';

const rootReducer = combineReducers({
  // auth:
  // projectHistory:
  // questions:
  // ...
  auth: authReducer,
  routing: routerReducer,
});

export default rootReducer;
