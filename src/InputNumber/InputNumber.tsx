import React, {useState} from 'react';
import {css} from '@emotion/react';
import {isEmptyString} from '../utils/string.utils';
import {toDecimalString} from '../utils/numeric.utils';
import {Input} from '../Input';
import {IInputNumberProps} from './types';

const toString = (value: string | number) => {
  if (typeof value === 'number') {
    return String(value);
  }
  return value;
};

const disableSpinBtn = css({
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {appearance: 'none', margin: 0},
  appearance: 'textfield',
});

export function InputNumber(props: IInputNumberProps) {
  const {
    type,
    disabled = false,
    locales = 'ru-RU',
    formatOptions = {},
    value = '',
    parser = 'parseFloat',
    zeroWhenEmpty = false,
    onFocus,
    onChange,
    onBlur,
    name,
    ...inputProps
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const hasFormatOptions = Object.keys(formatOptions).length > 0;

  const applyNumberOptions = (value: string) => {
    if (isEmptyString(value)) return '';
    const result = Number(value);
    const fractionDigits = formatOptions.maximumFractionDigits || 3;
    return result.toFixed(fractionDigits);
  };

  const formatAsLocaleString = (rawValue: string | number) => {
    const valueStringified = toString(rawValue);
    return toDecimalString(valueStringified, locales, formatOptions, parser);
  };

  const formatAsNumber = (value: string | number) => {
    const valueStringified = toString(value);
    const numericVal = hasFormatOptions ? applyNumberOptions(valueStringified) : valueStringified;

    if (zeroWhenEmpty) {
      return isEmptyString(numericVal) ? 0 : Number[parser](numericVal);
    }
    return isEmptyString(numericVal) ? '' : Number[parser](numericVal);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const formattedValue = formatAsNumber(event.target.value);
      onChange(formattedValue, event);
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    setIsEditing(true);
    const val = Number(event.target.value);
    onFocus && onFocus(val, event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    setIsEditing(false);
    const val = Number(event.target.value);
    onBlur && onBlur(val, event);
  };

  return (
    <>
      {isEditing ? (
        <Input
          css={disableSpinBtn}
          value={value}
          name={name}
          type="number"
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
          autoComplete="off"
          {...inputProps}
        />
      ) : (
        <Input
          css={disableSpinBtn}
          value={formatAsLocaleString(value as string | number)}
          name={name}
          type="tel"
          onFocus={handleFocus}
          onChange={undefined}
          disabled={disabled}
          autoComplete="off"
          {...inputProps}
        />
      )}
    </>
  );
}
