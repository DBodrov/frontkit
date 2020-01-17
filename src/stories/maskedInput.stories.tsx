import React from 'react';

import { storiesOf } from '@storybook/react';
import { MaskedInput } from '../components/MaskedInput';

storiesOf('Masked Input', module).add(
    'Input',
    () => (
        <MaskedInput
            placeholder="Введите телефон"
            mask="+7 (999) 999 99 99"
            // value="+7 (960) 862 22 26"
        />
    ),
    { info: { inline: true } },
);
