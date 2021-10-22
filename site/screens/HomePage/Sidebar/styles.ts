import styled from '@emotion/styled';
import {NavLink} from 'react-router-dom';

export const Aside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  box-shadow: 0px 4px 3px #cccedd, 3px 0px 4px rgba(239, 239, 239, 0.5);
  border-right: 1px var(--color-border) solid;
  padding: 75px 1rem 1rem 1rem;
`;

export const RouteList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 0;
  list-style: none;
`;

export const Link = styled(NavLink)`
  display: flex;
  flex-flow: row wrap;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  :hover {
    color: var(--color-link);
    cursor: pointer;
  }
`;
