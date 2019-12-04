import React from 'react';

import { storiesOf } from '@storybook/react';

import { PaymentCard, PaymentCardBack } from '../components/PaymentCard';

storiesOf('PaymentCard', module).add(
    'PaymentCard',
    () => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '50%' }}>
                <PaymentCard />
            </div>
            <PaymentCardBack />
        </div>
    ),
    { info: { inline: true } },
);
