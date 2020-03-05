import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PaymentCards } from '../components/PaymentCard';

storiesOf('PaymentCard', module).add(
    'PaymentCards',
    () => (
        <div style={{ padding: '22px', border: '1px solid black' }}>
            <PaymentCards onSuccess={action('onSuccess')} onPaymentDataChange={action('onPaymentDataChange')} />
        </div>
    ),
    {
        info: { inline: true },
    },
);
