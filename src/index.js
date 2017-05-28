import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
require('./style.scss');

ReactDOM.render(
  <Board />,
  document.querySelector('#app')
);
