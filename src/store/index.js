/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const initialState = {};
const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

export default store;
