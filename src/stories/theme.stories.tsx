import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../components/Button';
import { ThemeTypes, ThemeProvider } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    mainColor: '#8000ff',
};

storiesOf('Theme', module).add(
    'ThemeProvider',
    () => (
        <ThemeProvider value={theme}>
            <Button>Отправить</Button>
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [Button] } },
);
