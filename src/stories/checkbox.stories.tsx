import React from 'react';

import { storiesOf } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn1',
};

storiesOf('Checkbox', module).add('simple checkbox', () => <Checkbox label="Клик" />, { info: { inline: true } });
storiesOf('Checkbox', module).add('simple checkbox no label', () => <Checkbox />, { info: { inline: true } });
storiesOf('Checkbox', module).add(
    'Theme checkbox',
    () => (
        <ThemeProvider value={theme}>
            <Checkbox label="Клик" />
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
