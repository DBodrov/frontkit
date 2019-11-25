import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../components/Button';
import { ThemeProvider } from '../components/ThemeProvider';

const theme = {
    styles: {
        color: 'black',
        backgroundColor: '#8000ff',
    },
    className: 'cn1',
};

storiesOf('Theme', module).add(
    'ThemeProvider',
    () => (
        <ThemeProvider value={theme}>
            <Button>Отправить</Button>
        </ThemeProvider>
    ),
    { info: { inline: true } },
);
