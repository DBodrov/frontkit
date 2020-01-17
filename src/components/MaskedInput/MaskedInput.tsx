import React from 'react';
import InputMask from 'react-input-mask';

import { Props as InputProps } from '../Input/types';
import { Input } from '../Input';

interface MaskedInputProps extends InputProps {
    mask: string;
}

export function MaskedInput(props: MaskedInputProps): JSX.Element {
    return (
        <InputMask mask={props.mask} maskChar={null} onChange={props.onChange}>
            {(): JSX.Element => <Input placeholder={props.placeholder} {...props} />}
        </InputMask>
    );
}
