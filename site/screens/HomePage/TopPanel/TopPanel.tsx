import React from 'react';
import {Navbar} from './styles';

export function TopPanel() {
  return (
    <Navbar>
      <span>
        A3 Front Kit {process.env.LIB_VERSION} {process.env.NODE_ENV === 'development' ? 'development' : ''}
      </span>
    </Navbar>
  );
}
