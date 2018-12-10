import { combineReducers } from 'redux';

import fetchReducer from './generalFetch';
import postReducer from './postReducers';

const rootReducer = combineReducers({
  generalFetch: fetchReducer,
  posts: postReducer
});

export default rootReducer;
