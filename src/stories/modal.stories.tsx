import React from 'react';

import { storiesOf } from '@storybook/react';
import { Modal } from '../components/Modal';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    mainColor: '#8000ff',
};

storiesOf('Modal', module).add(
    'simple Modal',
    () => (
        <ThemeProvider value={theme}>
            <Modal onClose={action('close')} header="1231231">
                <span>123</span>
            </Modal>
        </ThemeProvider>
    ),
    { info: { inline: true } },
);
