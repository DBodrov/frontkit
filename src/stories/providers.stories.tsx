import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from '../components/Providers';

storiesOf('Providers', module).add(
    'Provider',
    () => <Provider name="Очень длинный заголовок. ООООчень" src="https://www.a-3.ru/img/logo_png/home-icon.png" width="300px" />,
    {
        info: { inline: true },
    },
);
