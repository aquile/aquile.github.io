import React from 'react';
import ReactDOM from 'react-dom';

import 'fetch-ie8';
import 'babel-polyfill';

import View from './components/View';

console.log('eTools app started');

ReactDOM.render(<View />, document.body); // В бади запихнем DOM из Configuration.js