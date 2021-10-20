import React from 'react';
import {Switch, Route} from 'react-router-dom';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <span>Choose component from left sidebar</span>
      </Route>
    </Switch>
  );
}
