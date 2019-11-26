import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '../components/Spinner';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn1',
};

storiesOf('Spinner', module)
    .add('Spinner', () => <Spinner />, { info: { inline: true } })
    .add(
        'Theme Spinner',
        () => (
            <ThemeProvider value={theme}>
                <Spinner />
            </ThemeProvider>
        ),
        { info: { inline: true } },
    )
    .add(
        'Colored Theme Spinner',
        () => (
            <ThemeProvider value={theme}>
                <Spinner color="#0dd9d5" />
            </ThemeProvider>
        ),
        { info: { inline: true } },
    );
