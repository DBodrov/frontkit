import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, Providers } from '../components/Providers';
import { action } from '@storybook/addon-actions';

storiesOf('Providers', module)
    .add(
        'Provider',
        () => (
            <Provider
                onClick={action('click')}
                name="Очень длинный заголовок. ООООчень"
                src="https://www.a-3.ru/img/logo_png/home-icon.png"
                width="300px"
            />
        ),
        {
            info: { inline: true },
        },
    )
    .add(
        'providers',
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
                size={5}
                gap="1vw"
                onClick={action('click')}
            />
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
                size={5}
                gap="1vw"
                onClick={action('click')}
            />
        ),
        {
            info: { inline: true },
        },
    );
