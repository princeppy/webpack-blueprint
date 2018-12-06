'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// import $ from 'jQuery';
// window.jQuery = $;
// window.$ = $;
// const { jQuery: $, Underscore: _, etc } = window;
// window.$ = window.jQuery = require('jQuery');

const wrapper = document.getElementById('root');
// eslint-disable-next-line no-unused-expressions
wrapper ? ReactDOM.render(<App title='My React App!!' />, wrapper) : false;

console.log('My React App!!');

// // const arr = [1, 2, 3];
// // const iAmJavascriptES6 = () => console.log(...arr);
// // window.iAmJavascriptES6 = iAmJavascriptES6;
//
// // async function foo() {
// //   await bar();
// // }
