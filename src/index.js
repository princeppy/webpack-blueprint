'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';

// import $ from 'jQuery';
// window.jQuery = $;
// window.$ = $;
// const { jQuery: $, Underscore: _, etc } = window;
// window.$ = window.jQuery = require('jQuery');

import postReducer from './reducers/sampleReducer';

const store = createStore(postReducer);

const wrapper = document.getElementById('root');
// eslint-disable-next-line no-unused-expressions
wrapper
  ? ReactDOM.render(
      <Provider store={store}>
        <App title='My React App!!' />
      </Provider>,
      wrapper
    )
  : false;

console.log('My React App!!');

// // const arr = [1, 2, 3];
// // const iAmJavascriptES6 = () => console.log(...arr);
// // window.iAmJavascriptES6 = iAmJavascriptES6;
//
// // async function foo() {
// //   await bar();
// // }

// import async.js
// import('./async.js').then(data => {
//   console.log(data);
// });
