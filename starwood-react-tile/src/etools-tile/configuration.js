import React from 'react';
import ReactDOM from 'react-dom';

import 'fetch-ie8';
import 'babel-polyfill';

import Configuration from './components/Configuration';

console.log('eTools app started');

ReactDOM.render(<Configuration />, document.body); // В бади запихнем DOM из Configuration.js