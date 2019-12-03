import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input, ErrorIcon, SuccessIcon, BackgroundProp, SearchIcon } from '../components/Input';

storiesOf('Input', module)
    .add('base', () => <Input />, { info: { inline: true } })
    .add('error', () => <Input RightIcon={ErrorIcon} background={BackgroundProp.Error} />, { info: { inline: true } })
    .add('success', () => <Input RightIcon={SuccessIcon} background={BackgroundProp.Success} />, { info: { inline: true } })
    .add('search', () => <Input LeftIcon={SearchIcon} />, { info: { inline: true } })
    .add('placeholder', () => <Input placeholder="Подсказка" />, { info: { inline: true } });
