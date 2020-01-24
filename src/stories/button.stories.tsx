import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, StyleTypeProp } from '../components/Button';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        mainColor: '#8000ff',
        btnTextColor: '#000000',
    },
    className: 'cn1',
};

storiesOf('Button', module).add('simple button', () => <Button>Отправить</Button>, { info: { inline: true } });
storiesOf('Button', module).add(
    'Theme Default',
    () => (
        <ThemeProvider value={theme}>
            <Button styleType={StyleTypeProp.Default}>Отправить</Button>
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
storiesOf('Button', module).add(
    'Theme UsedDefault',
    () => (
        <>
            <ThemeProvider value={theme}>
                <Button styleType={StyleTypeProp.UsedDefault}>Отправить</Button>
            </ThemeProvider>
            <Button styleType={StyleTypeProp.UsedDefault} style={{ marginTop: '15px' }}>
                Отправить
            </Button>
        </>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
storiesOf('Button', module).add(
    'Theme WhiteBodyWithBorder',
    () => (
        <>
            <ThemeProvider value={theme}>
                <Button styleType={StyleTypeProp.WhiteBodyWithBorder}>Отправить</Button>
            </ThemeProvider>
            <Button styleType={StyleTypeProp.WhiteBodyWithBorder} style={{ marginTop: '15px' }}>
                Отправить
            </Button>
        </>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
storiesOf('Button', module).add(
    'Theme WhiteBodyWithShadow',
    () => (
        <>
            <ThemeProvider value={theme}>
                <Button styleType={StyleTypeProp.WhiteBodyWithShadow}>Отправить</Button>
            </ThemeProvider>
            <Button styleType={StyleTypeProp.WhiteBodyWithShadow} style={{ marginTop: '15px' }}>
                Отправить
            </Button>
        </>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
