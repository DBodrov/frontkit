import React from 'react';

import { storiesOf } from '@storybook/react';
import { Modal } from '../components/Modal';
import { action } from '@storybook/addon-actions';

storiesOf('Modal', module).add(
    'simple Modal',
    () => (
        <Modal onClose={action('close')} header="1231231">
            <span>123</span>
        </Modal>
    ),
    { info: { inline: true } },
);
