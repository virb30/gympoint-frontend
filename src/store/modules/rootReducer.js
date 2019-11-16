import { combineReducers } from 'redux';

import auth from './auth/reducer';
import registration from './registration/reducer';

export default combineReducers({
  auth,
  registration,
});
