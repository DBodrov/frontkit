import styled from '@emotion/styled';

export const Page = styled.main`
  display: grid;
  grid-template: 1fr / 280px 1fr;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary);
`;

export const Content = styled.section`
  display: grid;
  grid-template: 75px 1fr/ 1fr;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary);
`;

export const WorkSection = styled.section`
  display: flex;
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
