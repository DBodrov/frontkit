import React from 'react';

import { storiesOf } from '@storybook/react';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { SimpleSelect, SimpleSelectPosition } from '../components/Select';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: Partial<ThemeTypes> = {
    linkColor: '#8000ff',
};

const simpleBreadCrumbs = [
    {
        text: 'Главная',
        onClick: () => console.log('Главная'),
        active: false,
    },
];

const activeBreadCrumbs = [
    {
        text: 'Выбор поставщика',
        onClick: () => console.log('Главная'),
        active: true,
    },
];

const simpleElements = [
    { value: 'Vfufl', onClick: () => console.log('Vfufl') },
    { value: 'Vfuflsdfsdfsfd', onClick: () => console.log('Vfuflsdfsdfsfd') },
];

const fullBreadCrumbs = [
    {
        text: 'Главная',
        onClick: () => console.log('Главная'),
        active: true,
    },
    {
        text: 'Данные платежа',
        onClick: () => console.log('Данные платежа'),
        active: false,
    },
    {
        text: 'Оплата',
        onClick: () => console.log('Оплата'),
        active: true,
    },
];

storiesOf('BreadCrumbs', module).add('simple BreadCrumbs', () => <BreadCrumbs data={simpleBreadCrumbs} />, { info: { inline: true } });
storiesOf('BreadCrumbs', module).add('activeSimple BreadCrumbs', () => <BreadCrumbs data={activeBreadCrumbs} />, {
    info: { inline: true },
});
storiesOf('BreadCrumbs', module).add('full BreadCrumbs', () => <BreadCrumbs data={fullBreadCrumbs} />, { info: { inline: true } });
storiesOf('BreadCrumbs', module).add(
    'theme BreadCrumbs',
    () => (
        <ThemeProvider value={theme}>
            <BreadCrumbs data={fullBreadCrumbs} />
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
storiesOf('BreadCrumbs', module).add(
    'basket breadcrumbs',
    () => (
        <ThemeProvider value={theme}>
            <BreadCrumbs data={fullBreadCrumbs} RightComponent={() => <>Корзина</>} />
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
storiesOf('BreadCrumbs', module).add(
    'basket regions breadcrumbs',
    () => (
        <ThemeProvider value={theme}>
            <BreadCrumbs
                data={activeBreadCrumbs}
                RegionsComponent={() => (
                    <SimpleSelect
                        data={simpleElements}
                        mainText="Кабардино‑Балкарская Республика 123123"
                        position={SimpleSelectPosition.right}
                        needArrow={true}
                    />
                )}
                RightComponent={() => <>Корзина</>}
            />
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
storiesOf('BreadCrumbs', module).add(
    'basket; only main link',
    () => (
        <ThemeProvider value={theme}>
            <BreadCrumbs data={simpleBreadCrumbs} RightComponent={() => <>Корзина</>} />
        </ThemeProvider>
    ),
    { info: { inline: true, propTablesExclude: [ThemeProvider] } },
);
