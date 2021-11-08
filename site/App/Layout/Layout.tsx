import React from 'react';
import {Outlet} from 'react-router-dom';
import {Sidebar} from './Sidebar';
import {TopPanel} from './TopPanel';
import {Page, Content, WorkSection} from './styles';

export function Layout() {
  return (
    <Page>
      <Sidebar />
      <Content>
        <TopPanel />
        <WorkSection>
          <Outlet />
        </WorkSection>
      </Content>
    </Page>
  );
}
