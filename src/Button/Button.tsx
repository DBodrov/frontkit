import React from 'react';
import {StyledButton} from './styles';
import {IButtonProps} from './types';

export function Button(props: IButtonProps) {
  const {children, variant = 'primary', ...restProps} = props;
  return (
    <StyledButton variant={variant} {...restProps}>
      {children}
    </StyledButton>
  );
}
