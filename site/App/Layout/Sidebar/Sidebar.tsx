import React from 'react';
import {NavLinkProps} from 'react-router-dom';
import {Aside, RouteList, RouteListItem, Link} from './styles';

function SideNavLink({children, to}: NavLinkProps) {
  return (
    <Link
      to={to}
      style={({isActive}) => ({color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)'})}
    >
      {children}
    </Link>
  );
}

export function Sidebar() {
  return (
    <Aside>
      <RouteList>
        <RouteListItem>
          <SideNavLink to="typography">Typography</SideNavLink>
        </RouteListItem>
        <RouteListItem>
          <SideNavLink to="button">Button</SideNavLink>
        </RouteListItem>
        <RouteListItem>
          <SideNavLink to="loader">Loader</SideNavLink>
        </RouteListItem>
        <RouteListItem>
          <SideNavLink to="radio">Radio and Checkbox</SideNavLink>
        </RouteListItem>
        <RouteListItem>
          <SideNavLink to="select">Select</SideNavLink>
        </RouteListItem>
        <RouteListItem>
          <SideNavLink to="input">Input</SideNavLink>
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
