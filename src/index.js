'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App.js';

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<App title="My React App!!" />, wrapper) : false;

const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;
