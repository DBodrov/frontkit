import React from 'react';

import { storiesOf } from '@storybook/react';

import { Card } from '../components/Card';

storiesOf('Card', module).add(
    'Card',
    () => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '50%' }}>
                <Card>
                    <div>
                        Электроэнергия
                        <div>Фонд содействия реформированию ЖКХ Белгородской области</div>
                    </div>
                    <div>К оплате</div>
                    <div>1 055,12 ₽</div>
                </Card>
            </div>
        </div>
    ),
    { info: { inline: true } },
);
