import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PaymentCards, SelectCard } from '../components/PaymentCard';

const data = {
    default: true,
    id: '6fv1qjg2fk',
    link: 'https://www.a-3.ru/img/logo_png/MasterCard-vlbank-78x25.png',
    title: '**** **** **** 0002',
    type: 'MC2',
};

const data1 = {
    default: true,
    id: '6fv1qjg2fk',
    link: 'https://www.a-3.ru/img/logo_png/MasterCard-vlbank-78x25.png',
    title: '**** **** **** 0002',
    type: 'MC',
};

const data2 = {
    default: true,
    id: '6fv1qjg2fk',
    link: 'https://www.a-3.ru/img/logo_png/MasterCard-vlbank-78x25.png',
    title: '**** **** **** 0002',
    type: 'VISA',
};

const data3 = {
    default: true,
    id: '6fv1qjg2fk',
    link: 'https://www.a-3.ru/img/logo_png/MasterCard-vlbank-78x25.png',
    title: '**** **** **** 0002',
    type: 'MIR',
};

storiesOf('PaymentCard', module)
    .add(
        'PaymentCards',
        () => (
            <div style={{ border: '1px solid black' }}>
                <PaymentCards onSuccess={action('onSuccess')} onPaymentDataChange={action('onPaymentDataChange')} />
                <PaymentCards disabled onSuccess={action('onSuccess')} onPaymentDataChange={action('onPaymentDataChange')} />
            </div>
        ),
        {
            info: { inline: true },
        },
    )
    .add(
        'SelectCard',
        () => (
            <div style={{ border: '1px solid black' }}>
                <SelectCard onSuccess={action('onSuccess')} onPaymentDataChange={action('onPaymentDataChange')} data={data} active={true} />
                <SelectCard
                    onSuccess={action('onSuccess')}
                    onPaymentDataChange={action('onPaymentDataChange')}
                    data={data1}
                    active={false}
                    onPreDelete={action('onPreDelete')}
                    onDelete={action('onDelete')}
                    disabled
                    loading={true}
                />
                <SelectCard
                    onSuccess={action('onSuccess')}
                    onPaymentDataChange={action('onPaymentDataChange')}
                    data={data2}
                    onPreDelete={action('onPreDelete')}
                    active={true}
                    onDelete={action('onDelete')}
                />
                <SelectCard
                    onSuccess={action('onSuccess')}
                    onPaymentDataChange={action('onPaymentDataChange')}
                    onPreDelete={action('onPreDelete')}
                    data={data3}
                    disabled
                    active={true}
                />
                <SelectCard
                    onSuccess={action('onSuccess')}
                    onPaymentDataChange={action('onPaymentDataChange')}
                    onPreDelete={action('onPreDelete')}
                    data={data1}
                    disabled
                    active={false}
                />
                <SelectCard
                    onSuccess={action('onSuccess')}
                    onPaymentDataChange={action('onPaymentDataChange')}
                    data={data2}
                    active={false}
                    onDelete={action('onDelete')}
                />
                <SelectCard
                    onSuccess={action('onSuccess')}
                    onPaymentDataChange={action('onPaymentDataChange')}
                    data={data3}
                    active={false}
                />
            </div>
        ),
        {
            info: { inline: true },
        },
    );
