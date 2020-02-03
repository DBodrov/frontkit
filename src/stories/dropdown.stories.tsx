import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown, LinkWrapper } from '../';
import styles from '../components/Dropdown/Dropdown.module.css';

const data = ['123', '12321312', '789', '123213'];

function More(): JSX.Element {
    return (
        <div className={styles.more} onClick={action('Показать все результаты')}>
            <LinkWrapper>Показать все результаты</LinkWrapper>
        </div>
    );
}

storiesOf('Dropdown', module)
    .add(
        'base',
        () => (
            <Dropdown
                data={data}
                value="123"
                loading={false}
                showDimmer={true}
                getKeyCode={action('key')}
                onChangeInput={action('onChangeInput')}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onSelect={action('selected')}
                showMoreElement={More}
                clickOutSide={action('clickOutSide')}
                onFocus={action('focus')}
            />
        ),
        { info: { inline: true } },
    )
    .add(
        'base Loading',
        () => (
            <Dropdown
                data={data}
                value="123"
                loading={true}
                showDimmer={true}
                getKeyCode={action('key')}
                onChangeInput={action('onChangeInput')}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onSelect={action('selected')}
                showMoreElement={More}
                clickOutSide={action('clickOutSide')}
                onFocus={action('focus')}
            />
        ),
        { info: { inline: true } },
    )
    .add(
        'base notFound',
        () => (
            <Dropdown
                data={[]}
                value="123"
                loading={false}
                showDimmer={true}
                getKeyCode={action('key')}
                onChangeInput={action('onChangeInput')}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onSelect={action('selected')}
                showMoreElement={More}
                clickOutSide={action('clickOutSide')}
                onFocus={action('focus')}
            />
        ),
        { info: { inline: true } },
    )
    .add(
        'empty',
        () => (
            <Dropdown
                data={[]}
                value="123"
                loading={false}
                showDimmer={false}
                getKeyCode={action('key')}
                onChangeInput={action('onChangeInput')}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onSelect={action('selected')}
                showMoreElement={More}
                clickOutSide={action('clickOutSide')}
                onFocus={action('focus')}
            />
        ),
        { info: { inline: true } },
    );
