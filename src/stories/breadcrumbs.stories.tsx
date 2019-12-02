import React from 'react';

import { storiesOf } from '@storybook/react';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn1',
};

const simple = [
    {
        text: 'Главная',
        onClick: () => console.log('Главная'),
        active: false,
    },
];

const activeSimple = [
    {
        text: 'Главная',
        onClick: () => console.log('Главная'),
        active: true,
    },
];

const full = [
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

storiesOf('BreadCrumbs', module).add('simple BreadCrumbs', () => <BreadCrumbs data={simple} />, { info: { inline: true } });
storiesOf('BreadCrumbs', module).add('activeSimple BreadCrumbs', () => <BreadCrumbs data={activeSimple} />, { info: { inline: true } });
storiesOf('BreadCrumbs', module).add('full BreadCrumbs', () => <BreadCrumbs data={full} />, { info: { inline: true } });
