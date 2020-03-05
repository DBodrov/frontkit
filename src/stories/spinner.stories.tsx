import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '../components/Spinner';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    mainColor: '#8000ff',
};

const themeLoadedColor: ThemeTypes = {
    mainColor: '#8000ff',
    loaderColor: 'red',
};

storiesOf('Spinner', module)
    .add('Spinner', () => <Spinner />, { info: { inline: true } })
    .add(
        'Theme Spinner',
        () => (
            <ThemeProvider value={themeLoadedColor}>
                <Spinner />
            </ThemeProvider>
        ),
        { info: { inline: true } },
    )
    .add('Spinner', () => <Spinner />, { info: { inline: true } })
    .add(
        'Theme mainColor Spinner',
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
        { info: { inline: true, propTablesExclude: [ThemeProvider] } },
    );
