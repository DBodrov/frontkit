import React from 'react';
import {RadioInput} from './styles';
import {IRadioButtonProps} from './types';

const noop = () => {}

export function Radio(props: IRadioButtonProps) {
  const {name, id, value, children, checked = false, onChange = noop, ...restProps} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div css={{display: 'flex'}}>
      <RadioInput
        type="radio"
        name={name}
        id={value}
        value={value}
        ref={inputRef}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        {...restProps}
      />
      <label css={{alignSelf: 'center', marginLeft: '0.5rem'}} htmlFor={value}>
        {children ? children : null}
      </label>
    </div>
  );
}
