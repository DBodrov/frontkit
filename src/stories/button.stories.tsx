import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, LoadingButton, StyleTypeProp } from '../components/Button';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    mainColor: '#8000ff',
    btnTextColor: '#000000',
};

storiesOf('Button', module).add(
    'simple button',
    () => (
        <div>
            <Button>Отправить</Button>
            <Button disabled>Отправить disabled</Button>
        </div>
    ),
    { info: { inline: true } },
);
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
    'Loading button',
    () => (
        <>
            <ThemeProvider value={theme}>
                <LoadingButton loading styleType={StyleTypeProp.UsedDefault} style={{ marginTop: '15px' }} text="Отправить" />
                <LoadingButton loading={false} styleType={StyleTypeProp.UsedDefault} style={{ marginTop: '15px' }} text="Отправить" />
            </ThemeProvider>
            <LoadingButton loading styleType={StyleTypeProp.UsedDefault} style={{ marginTop: '15px' }} text="Отправить" />
            <LoadingButton loading={false} styleType={StyleTypeProp.UsedDefault} style={{ marginTop: '15px' }} text="Отправить" />
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
