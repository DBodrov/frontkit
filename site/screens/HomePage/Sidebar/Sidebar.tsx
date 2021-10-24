import React from 'react';
import {Aside, RouteList, Link} from './styles';

export function Sidebar() {
  return (
    <Aside>
      <RouteList>
        <li css={{textAlign: 'center'}}>
          <Link to="/typography" activeStyle={{color: 'var(--color-primary)'}}>
            Typography
          </Link>
        </li>
        <li css={{textAlign: 'center'}}>
          <Link to="/button" activeStyle={{color: 'var(--color-primary)'}}>
            Button
          </Link>
        </li>
        <li css={{textAlign: 'center'}}>
          <Link to="/loader" activeStyle={{color: 'var(--color-primary)'}}>
            Loader
          </Link>
        </li>
        <li css={{textAlign: 'center'}}>
          <Link to="/radio" activeStyle={{color: 'var(--color-primary)'}}>
            Radio and Checkbox
          </Link>
        </li>
      </RouteList>
    </Aside>
  );
}
