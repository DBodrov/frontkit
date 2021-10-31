import React from 'react';
import LogoImage from 'site/assets/logoA3.webp';
import {Navbar} from './styles';

export function TopPanel() {
  return (
    <Navbar>
      <div css={{width: 95, height: '100%', padding: 8, backgroundColor: 'var(--color-primary)'}}>
        <img css={{maxWidth: '100%', height: '100%'}} src={LogoImage} alt="" />
      </div>
    </Navbar>
  );
}
