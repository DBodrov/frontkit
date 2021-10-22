import styled from '@emotion/styled';
import {css} from '@emotion/react';

export const nativeInputCss = css`
  width: 0;
  height: 0;
  opacity: 0;
`;

export const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5rem minmax(0, auto);
  column-gap: .5rem;
  line-height: 1.5rem;
  padding: 4px 0;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxElement = styled.div<{checked: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${props => props.checked ? 'var(--color-primary)' : 'var(--color-background)'};
  border: 1px solid ${props => props.checked ? 'var(--color-primary)' : 'var(--color-border)'};
  border-radius: 3px;
`;
