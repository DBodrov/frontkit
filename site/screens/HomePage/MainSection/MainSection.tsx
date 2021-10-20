import React from 'react';
import {TopPanel} from '../TopPanel';
import {Workbox} from './Workbox';
import {Content} from './styles';

export function MainSection() {
  return (
    <Content>
      <TopPanel></TopPanel>
      <Workbox />
    </Content>
  );
}
