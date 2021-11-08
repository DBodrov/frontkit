import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {TypographyPage, ButtonPage, LoaderPage, RadioPage, SelectPage, InputPage} from 'site/examples';
import {Layout} from './Layout';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TypographyPage />} />
          <Route path="typography" element={<TypographyPage />} />
          <Route path="button" element={<ButtonPage />} />
          <Route path="loader" element={<LoaderPage />} />
          <Route path="radio" element={<RadioPage />} />
          <Route path="select" element={<SelectPage />} />
          <Route path="input" element={<InputPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
