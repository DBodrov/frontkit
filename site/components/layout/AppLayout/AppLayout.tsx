import React from 'react';
import {Page} from './styles';

type Props = {children: React.ReactNode};
export function AppLayout({children}: Props) {
  return <Page>{children}</Page>;
}
