import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '../components/Spinner';

storiesOf('Spinner', module)
    .add('Spinner', () => <Spinner />, { info: { inline: true } })
    .add('Colored Spinner', () => <Spinner color="#0dd9d5" />, { info: { inline: true } });
