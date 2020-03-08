import React from 'react';

import { storiesOf } from '@storybook/react';
import { Group } from '../components/Group';
import { Div } from '../__tests__/Group/Div';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

storiesOf('Group', module)
    .add(
        'simple group',
        () => (
            <Group>
                <Div>
                    <Div />
                    <Div />
                    <Div />
                </Div>
                <Div />
                <Div />
            </Group>
        ),
        { info: { inline: true, propTablesExclude: [Div] } },
    )
    .add(
        'input+button',
        () => (
            <Group>
                <Input />
                <Button>Кнопка</Button>
            </Group>
        ),
        { info: { inline: true, propTablesExclude: [Div] } },
    );
