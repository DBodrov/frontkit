import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BackgroundProp, ErrorIcon, HelpIcon, Input, SearchIcon, SmallInput, SuccessIcon } from '../components/Input';
import image from './static/Number_LS_all_regions.png';

storiesOf('Input', module)
    .add('base', () => <Input />, { info: { inline: true } })
    .add('text align right', () => <Input right={true} defaultValue="123" />, { info: { inline: true } })
    .add('error', () => <Input RightIcon={ErrorIcon} background={BackgroundProp.Error} />, { info: { inline: true } })
    .add('success', () => <Input RightIcon={SuccessIcon} background={BackgroundProp.Success} />, { info: { inline: true } })
    .add('warning', () => <Input background={BackgroundProp.Warning} />, { info: { inline: true } })
    .add('white background', () => <Input background={BackgroundProp.White} />, { info: { inline: true } })
    .add(
        'help',
        () => (
            <>
                <Input
                    RightIcon={() => (
                        <HelpIcon text="Тестоasdas ads assd as dasd as das das dads sвый текст Тестоasdas ads assd as dasd as das das dads sвый текст Тестоasdas ads assd as dasd as das das dads sвый текст Тестоasdas ads assd as dasd as das das dads sвый текст" />
                    )}
                />
                <Input RightIcon={() => <HelpIcon text={<img src={image} style={{ maxWidth: '100%' }} />} />} />
                <SmallInput RightIcon={() => <HelpIcon text="Тестоasdas ads assd as dasd as das das dads sвый текст" />} />
            </>
        ),
        {
            info: { inline: true },
        },
    )
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
    .add('small', () => <SmallInput placeholder="placeholder" />, { info: { inline: true } })
    .add('placeholder', () => <Input placeholder="Подсказка" />, { info: { inline: true } })
    .add('disabled', () => <Input disabled value="Значение" />, { info: { inline: true } })
    .add('disabled left radius', () => <Input disableLeftBorderRadius value="Левая граница не закруглена" />, { info: { inline: true } })
    .add('disabled right radius', () => <Input disableRightBorderRadius value="Правая граница не закруглена" />, {
        info: { inline: true },
    });
