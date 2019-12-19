import React from 'react';

import { storiesOf } from '@storybook/react';

import { Box } from '../components/Box';

storiesOf('Box', module).add(
    'Box',
    () => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '50%' }}>
                <Box>
                    <div>
                        Электроэнергия
                        <div>Фонд содействия реформированию ЖКХ Белгородской области</div>
                    </div>
                    <div>К оплате</div>
                    <div>1 055,12 ₽</div>
                </Box>
            </div>
        </div>
    ),
    { info: { inline: true } },
);
