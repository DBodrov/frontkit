import React from 'react';
import InputMask from 'react-input-mask';

import { Props as InputProps } from '../Input/types';
import { Input } from '../Input';

interface MaskedInputProps extends InputProps {
    mask: string;
}

export function MaskedInput(props: MaskedInputProps): JSX.Element {
    return (
        <InputMask
            mask={props.mask}
            maskChar={null}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            onFocus={props.onFocus}
        >
            {(): JSX.Element => <Input {...props} />}
        </InputMask>
    );
}
