import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {TypographyPage, ButtonPage, LoaderPage} from './examples';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <span>Choose component from left sidebar</span>
      </Route>
      <Route path="/typography">
        <TypographyPage />
      </Route>
      <Route path="/button">
        <ButtonPage />
      </Route>
      <Route path="/loader">
        <LoaderPage />
      </Route>
    </Switch>
  );
}
