import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input, ErrorIcon, SuccessIcon, BackgroundProp, SearchIcon, HelpIcon } from '../components/Input';

storiesOf('Input', module)
    .add('base', () => <Input />, { info: { inline: true } })
    .add('text align right', () => <Input right={true} defaultValue="123" />, { info: { inline: true } })
    .add('error', () => <Input RightIcon={ErrorIcon} background={BackgroundProp.Error} />, { info: { inline: true } })
    .add('success', () => <Input RightIcon={SuccessIcon} background={BackgroundProp.Success} />, { info: { inline: true } })
    .add('help', () => <Input RightIcon={() => <HelpIcon text="Тестоasdas ads assd as dasd as das das dads sвый текст" />} />, {
        info: { inline: true },
    })
    .add(
        'custom styles',
        () => (
            <Input
                style={{ width: '200px' }}
                RightIcon={() => <HelpIcon text="Тестоasdas ads assd as dasd as das das dads sвый текст" />}
            />
        ),
        {
            info: { inline: true },
        },
    )
    .add('search', () => <Input LeftIcon={SearchIcon} />, { info: { inline: true } })
    .add('placeholder', () => <Input placeholder="Подсказка" />, { info: { inline: true } });
