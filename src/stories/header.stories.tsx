import React from 'react';

import { storiesOf } from '@storybook/react';

import { H1, H2, H3 } from '../components/Header';

storiesOf('Headers', module)
    .add('H1 header', () => <H1>Large header</H1>, { info: { inline: true } })
    .add('H2 header', () => <H2>Medium header</H2>, { info: { inline: true } })
    .add('H3 header', () => <H3>H3 header</H3>, { info: { inline: true } });
