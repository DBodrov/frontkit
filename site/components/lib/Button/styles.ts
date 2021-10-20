import styled from '@emotion/styled';
import {IButtonProps} from './types';

export const StyledButton = styled.button<IButtonProps>`
  display: flex;
  flex-flow: row nowrap;
  height: 3rem;
  width: 10rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 14px;
  border: 0;
  outline: 0;
  user-select: none;
  overflow: hidden;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${props => (props.outline ? 'var(--color-background)' : `var(--color-${props.variant})`)};
  color: ${props => (props.outline ? `var(--color-${props.variant})` : '#fff')};
  filter: ${props => (props.disabled ? 'brightness(1.1)' : 'brightness(1)')};

  &:hover {
    filter: ${props => (props.disabled ? 'brightness(1.1)' : 'brightness(0.9)')};
  }
`;
