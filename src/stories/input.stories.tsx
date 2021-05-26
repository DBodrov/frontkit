import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BackgroundProp, ErrorIcon, HelpIcon, Input, SearchIcon, SmallInput, SuccessIcon } from '../components/Input';
import { RootContainerProvider } from '../components/RootContainer';
// @ts-ignore
import image from './static/Number_LS_all_regions.png';

const img = new Image();
img.src = image;
const wrapperRef = React.createRef<HTMLInputElement>();
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
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef} style={{ width: '450px', margin: '100px' }}>
                    <Input
                        RightIcon={() => (
                            <HelpIcon text="Тестоasdas ads assd as dasd as das das dads sвый текст Тестоasdas ads assd as dasd as das das dads sвый текст Тестоasdas ads assd as dasd as das das dads sвый текст Тестоasdas ads assd as dasd as das das dads sвый текст" />
                        )}
                        style={{ width: '150px', marginLeft: '100px' }}
                    />
                    <Input
                        RightIcon={() => <HelpIcon text="Тестоasdas ads assd as dasd as das dasТестоasdas ads assd as dasd as das das" />}
                        style={{ width: '150px' }}
                    />
                    <Input RightIcon={() => <HelpIcon text={<img src={image} style={{ maxWidth: '100%' }} />} />} />
                    <SmallInput RightIcon={() => <HelpIcon text="Тестоasdas" />} />
                    <SmallInput style={{ width: '400px' }} RightIcon={() => <HelpIcon text="Тестоasdas" />} />
                </div>
            </RootContainerProvider>
        ),
        {
            info: { inline: true },
        },
    )
    .add(
        'custom styles',
        () => (
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef} style={{ width: '200px', margin: '100px' }}>
                    <Input
                        style={{ width: '200px' }}
                        RightIcon={() => <HelpIcon text="Тестоasdas ads assd as dasd as das das dads sвый текст" />}
                    />
                </div>
            </RootContainerProvider>
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
