import React from 'react';

import { storiesOf } from '@storybook/react';

import { PaymentCards } from '../components/PaymentCard';

storiesOf('PaymentCard', module).add('PaymentCards', () => <PaymentCards />, { info: { inline: true } });
