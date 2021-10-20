import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {HomePage} from './screens';

export function App() {
  return (
    <Router>
      <HomePage />
    </Router>
  );
}
