import styled from '@emotion/styled';
import {H1} from '@a3/uikit';

export const ExamplePage = styled.section`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

export const Viewarea = styled.article`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 2rem;
  background-color: var(--color-background);
  box-shadow: 0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32);
  border-radius: 6px;
`;

export const PageTitle = styled(H1)`
  width: 100%;
  padding-bottom: 3rem;
`;
