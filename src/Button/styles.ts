import styled from '@emotion/styled';
import {css} from '@emotion/react';
import {IButtonProps} from './types';

const hoverOutlineCss = (variant: IButtonProps['variant']) => css({
  backgroundColor: `var(--color-${variant})`,
  color: '#fff'
});

export const StyledButton = styled.button<IButtonProps>`
  display: flex;
  flex-flow: row nowrap;
  height: 3rem;
  width: 10rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 14px;
  border: ${props => props.outline ? `1px var(--color-${props.variant}, --color-primary) solid` : 0};
  outline: 0;
  user-select: none;
  overflow: hidden;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${props => (props.outline ? 'var(--color-background)' : `var(--color-${props.variant})`)};
  color: ${props => (props.outline ? `var(--color-${props.variant})` : '#fff')};


  &:disabled {
    background-color: var(--color-inactive, #EBF2FA);
    color: var(--color-text-secondary);
    border-color: var(--color-inactive, #EBF2FA);

    &:hover {
      background-color: var(--color-inactive, #EBF2FA);
    }
  }


  &:hover {
    filter: ${props => (props.disabled || props.outline ? 'brightness(1)' : 'brightness(0.9)')};
    ${props => props.outline && !props.disabled ? hoverOutlineCss(props.variant) : null}

  }
`;
