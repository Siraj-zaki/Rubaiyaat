import { combineReducers } from 'redux';
import { SohReducer } from './SohReducer';
import { userReducer } from './userReducer';
import { siteReducer } from './siteReducer'
export const rootReducer = combineReducers({
  createUser: userReducer,
  SOH_ASSETS: SohReducer,
  createSite: siteReducer,
});

