import React from 'react';

import { storiesOf } from '@storybook/react';
import { Radio } from '../components/Radio';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn1',
};

storiesOf('Radio', module).add(
    'simple Radio',
    () => (
        <div>
            <Radio name="123" label="123" value="123" />
            <Radio name="123" label="1234" value="1234" />
            <Radio disabled name="123" label="12345" value="12345" />
        </div>
    ),
    { info: { inline: true } },
);
storiesOf('Radio', module).add(
    'Theme Radio',
    () => (
        <ThemeProvider value={theme}>
            <div>
                <Radio name="123" label="123" value="123" />
                <Radio name="123" label="1234" value="1234" />
                <Radio disabled name="123" label="12345" value="12345" />
            </div>
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
