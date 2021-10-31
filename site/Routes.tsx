import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {TypographyPage, ButtonPage, LoaderPage, RadioPage, SelectPage, InputPage} from './examples';

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
      <Route path="/radio">
        <RadioPage />
      </Route>
      <Route path="/select">
        <SelectPage />
      </Route>
      <Route path="/input">
        <InputPage />
      </Route>
    </Switch>
  );
}
