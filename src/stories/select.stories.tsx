import React from 'react';

import { storiesOf } from '@storybook/react';
import { Select } from '../components/Select';
import { ElementTypes } from '../components/Select/Select';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        linkColor: '#8000ff',
    },
    className: 'cn1',
};

const elements: ElementTypes[] = [
    { name: '1', value: 'Vfufl', id: 111 },
    { name: '2', value: 'JKHsdkjbdfgjknsdf', id: 222 },
    { name: '3', value: 'jknfdv.njk', id: 333 },
    { name: '4', value: '44', id: 444 },
    { name: '5', value: '55', id: 555 },
    { name: '6', value: '66', id: 666 },
];

storiesOf('Select', module).add(
    'simple Select',
    () => (
        <ThemeProvider value={theme}>
            <Select elements={elements} name="12sdf34" />
        </ThemeProvider>
    ),
    { info: { inline: true } },
);
