import React from 'react';
import {Aside, RouteList, RouteListItem, Link} from './styles';

export function Sidebar() {
  return (
    <Aside>
      <RouteList>
        <RouteListItem>
          <Link to="/typography" activeStyle={{color: 'var(--color-primary)'}}>
            Typography
          </Link>
        </RouteListItem>
        <RouteListItem>
          <Link to="/button" activeStyle={{color: 'var(--color-primary)'}}>
            Button
          </Link>
        </RouteListItem>
        <RouteListItem>
          <Link to="/loader" activeStyle={{color: 'var(--color-primary)'}}>
            Loader
          </Link>
        </RouteListItem>
        <RouteListItem>
          <Link to="/radio" activeStyle={{color: 'var(--color-primary)'}}>
            Radio and Checkbox
          </Link>
        </RouteListItem>
        <RouteListItem>
          <Link to="/select" activeStyle={{color: 'var(--color-primary)'}}>
            Select
          </Link>
        </RouteListItem>
        <RouteListItem>
          <Link to="/input" activeStyle={{color: 'var(--color-primary)'}}>
            Input
          </Link>
        </RouteListItem>
      </RouteList>
      <article css={{marginTop: 'auto'}}>
        <span>
          A3 Front Kit {process.env.LIB_VERSION} {process.env.NODE_ENV === 'development' ? 'development' : ''}
        </span>
      </article>
    </Aside>
  );
}
