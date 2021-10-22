import React from 'react';
import {CheckIcon} from './CheckIcon';
import {nativeInputCss, CheckboxGroup, CheckboxElement} from './styles';

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox(props: ICheckboxProps) {
  const {name, id, checked, disabled, onChange, children} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <CheckboxGroup>
      <CheckboxElement onClick={handleClick} checked={checked}>
        {checked ? <CheckIcon /> : null}
      </CheckboxElement>
      {children}
      <input
        ref={inputRef}
        type="checkbox"
        name={name}
        id={id}
        css={nativeInputCss}
        checked={checked}
        onChange={e => onChange(e)}
      />
    </CheckboxGroup>
  );
}
