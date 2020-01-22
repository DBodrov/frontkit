import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PaymentCards } from '../components/PaymentCard';

storiesOf('PaymentCard', module).add(
    'PaymentCards',
    () => <PaymentCards onSuccess={action('onSuccess')} onPaymentDataChange={action('onPaymentDataChange')} />,
    {
        info: { inline: true },
    },
);
