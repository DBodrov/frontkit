import React from 'react';

import { storiesOf } from '@storybook/react';
import { Modal } from '../components/Modal';

storiesOf('Modal', module).add(
    'simple Radio',
    () => (
        <Modal onClose={() => console.log('close')} header="1231231">
            <span>123</span>
        </Modal>
    ),
    { info: { inline: true } },
);
