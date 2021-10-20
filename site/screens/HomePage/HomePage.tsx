import React from 'react';
import {AppLayout} from 'site/components/layout';
import {Sidebar} from './Sidebar';
import {MainSection} from './MainSection';

export function HomePage() {
  return (
    <AppLayout>
      <Sidebar />
      <MainSection />
    </AppLayout>
  );
}
