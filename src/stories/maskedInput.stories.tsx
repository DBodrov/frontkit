import React from 'react';

import { storiesOf } from '@storybook/react';
import { MaskedInput } from '../components/MaskedInput';

storiesOf('Masked Input', module).add(
    'Input',
    () => <MaskedInput placeholder="Введите телефон" autoFocus={true} mask="+7 (999) 999 99 99" />,
    {
        info: { inline: true },
    },
);
