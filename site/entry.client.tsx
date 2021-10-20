import React from 'react';
import ReactDOM from 'react-dom';
import {Global} from '@emotion/react';
import {App} from './App';
import {appStyles} from './appStyles';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={appStyles} />
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
