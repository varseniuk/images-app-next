import { combineReducers } from 'redux';
import { favouritesReducer } from './favouritesReducer';

export const reducers = combineReducers({
  favourites: favouritesReducer,
});
