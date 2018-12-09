import { combineReducers } from 'redux';

import postReducer from './postReducers';

const rootReducer = combineReducers({
  posts: postReducer
});

export default rootReducer;
