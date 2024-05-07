import { combineReducers } from 'redux';

import auth from './auth';
import home from './home';


const rootReducer = combineReducers({
  auth,
  home
});

export default (state, action) => rootReducer(state, action);
