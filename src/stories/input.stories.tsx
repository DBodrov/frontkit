import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../components/Input';

storiesOf('Input', module)
    .add('base', () => <Input />, { info: { inline: true } })
    .add('placeholder', () => <Input placeholder="Подсказка" />, { info: { inline: true } });
