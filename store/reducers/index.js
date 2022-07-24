import { combineReducers } from 'redux';
import { favouritesReducer } from './favouritesReducer';
import { searchResultsReducer } from './searchResultsReducer';

export const reducers = combineReducers({
  favourites: favouritesReducer,
  searchResults: searchResultsReducer,
});
