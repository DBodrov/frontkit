import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, Providers } from '../components/Providers';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    linkColor: '#8000ff',
};

storiesOf('Providers', module)
    .add(
        'Provider',
        () => (
            <Provider
                onClick={action('click')}
                name={'МУНИЦИПАЛЬНОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ АРТЕМОВСКОГО ГОРОДСКОГО ОКРУГА "ПРОГРЕСС"'}
                src="https://www.a-3.ru/img/logo_png/home-icon.png"
                addText="Комиссия 0%"
                addTextEnabled
                addTextBackgroundColor="#935454"
                width="227px"
            />
        ),
        {
            info: { inline: true },
        },
    )
    .add(
        'providers',
        () => (
            <ThemeProvider value={theme}>
                <div style={{ width: '800px' }}>
                    <Providers
                        data={[
                            { id: 1, name: 'A', src: 'https://www.a-3.ru/img/logo_png/home-icon.png', addText: 'Комиссия 0%' },
                            {
                                id: 2,
                                name: 'Смарт Восток (ЖКУ)1',
                                src: 'https://www.a-3.ru/img/logo_png/home-icon.png',
                                addTextEnabled: true,
                                addTextBackgroundColor: '#935454',
                                addText: 'Комиссия 0%',
                            },
                            {
                                id: 3,
                                name: 'Смарт Восток (ЖКУ)2',
                                src: 'https://www.a-3.ru/img/logo_png/home-icon.png',
                                addTextEnabled: false,
                                addText: 'Комиссия 0%',
                            },
                            {
                                id: 4,
                                name: 'Смарт Восток (ЖКУ)3',
                                src: 'https://www.a-3.ru/img/logo_png/home-icon.png',
                                addTextEnabled: true,
                                addText: 'Комиссия 0%',
                            },
                            { id: 5, name: 'Смарт Восток (ЖКУ)4', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                            { id: 6, name: 'Смарт Восток (ЖКУ)5', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                            {
                                id: 7,
                                name:
                                    'МУНИЦИПАЛЬНОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ АРТЕМОВСКОГО ГОРОДСКОГО ОКРУГА ЖИЛИЩНО-КОММУНАЛЬНОЕ ХОЗЯЙСТВО ПОСЕЛКА БУЛАНАШ',
                                src: 'https://www.a-3.ru/img/logo_png/home-icon.png',
                                addText: 'Комиссия 0%',
                            },
                            { id: 8, name: 'H', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                            { id: 9, name: 'I', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                            { id: 10, name: 'J', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                        ]}
                        cols={3}
                        gap="1vw"
                        onClick={action('click')}
                        style={{ marginBottom: '20px' }}
                    />
                </div>
            </ThemeProvider>
        ),
        {
            info: { inline: true },
        },
    )
    .add(
        'small amount',
        () => (
            <Providers
                data={[
                    { id: 1, name: 'A', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 2, name: 'B', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 3, name: 'C', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                ]}
                cols={5}
                gap="1vw"
                onClick={action('click')}
            />
        ),
        {
            info: { inline: true },
        },
    )
    .add(
        'rectangle',
        () => (
            <Providers
                data={[
                    { id: 1, name: 'A', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 2, name: 'B', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 3, name: 'C', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 4, name: 'D', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 5, name: 'E', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 6, name: 'F', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 7, name: 'G', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 8, name: 'H', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 9, name: 'I', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                    { id: 10, name: 'J', src: 'https://www.a-3.ru/img/logo_png/home-icon.png' },
                ]}
                cols={3}
                rows={2}
                gap="1vw"
                onClick={action('click')}
            />
        ),
        {
            info: { inline: true },
        },
    );
