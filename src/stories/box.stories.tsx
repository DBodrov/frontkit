import React from 'react';

import { storiesOf } from '@storybook/react';

import { Box, SplitType } from '../components/Box';

storiesOf('Box', module)
    .add(
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
    )
    .add(
        'Box with padding',
        () => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '50%' }}>
                    <Box getSplitType={SplitType.Padding}>
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
    )
    .add(
        'Box with last padding',
        () => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '50%' }}>
                    <Box getSplitType={SplitType.OnlyLastFull}>
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
